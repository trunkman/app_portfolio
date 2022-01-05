# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :logged_in_user, only: %i[index show edit update destroy
                                              microposts following followers
                                              diaries timeline rooms books ]
      before_action :correct_user,   only: %i[edit update]

      def index
        @users = User.where(activated: true)
        render json: { users: @users }, status: :ok
      end

      def show
        @user = User.find(params[:id])
        @following_ids = @user.following_ids
        @followers_ids = @user.follower_ids
        followStatus = current_user.following?(@user)
        @subscriptions = @user.subscriptions
        if @user.activated?
          render json: { user: @user,
                         following_ids: @following_ids,
                         followers_ids: @followers_ids,
                         followStatus: followStatus,
                         subscriptions: @subscriptions },
                 status: :ok
        else
          render json: { message: 'ユーザーのアカウントが有効化されていません' },
                 status: :unauthorized
        end
      end

      def create
        @user = User.new(user_params)
        if @user.save
          @user.send_activation_email
          render json: { message: 'アカウント有効化メール送信しました' },
                 status: :created
        else
          render json: { message: '登録しようとしている情報に誤りがあります' },
                 status: :unprocessable_entity
        end
      end

      def update
        @user = User.find(params[:id])
        if @user.update(user_params)
          render json: { user: @user },
                 status: :ok
        else
          render json: { message: '更新する情報に誤りがあります' },
                 status: :unprocessable_entity
        end
      end

      def destroy
        @user = User.find(params[:id])
        if current_user?(@user) || current_user.admin?
          @user.destroy
          render json: { message: 'アカウントを削除しました' },
                 status: :ok
        else
          render json: { message: 'このアカウントは削除できません' },
                 status: :forbidden
        end
      end

      # 投稿&コメント一覧を返す
      def microposts
        @user = User.find(params[:id])
        # 投稿の取得
        @microposts = []
        @user.microposts.each do |post|
          # current_userによるいいね有無の判定
          likeStatus = current_user.liked?(post)
          # 投稿に対してのコメント数を検索
          commentCount = post.comment_ids.count
          @microposts << { micropost: post,
                           likeStatus: likeStatus,
                           commentCount: commentCount }
        end
        # いいねした投稿の取得
        @liked_microposts = []
        @user.liked_microposts.each do |post|
          user = post.user
          commentCount = post.comment_ids.count
          @liked_microposts << { liked_micropost: post,
                                 likeStatus: true,
                                 commentCount: commentCount,
                                 user: user }
        end
        # コメントの取得
        @comments = @user.comments
        render json: { microposts: @microposts,
                       liked_microposts: @liked_microposts,
                       comments: @comments },
               status: :ok
      end

      # フォロー中のユーザーを返す
      def following
        @user = User.find(params[:id])
        @following = []
        # current_userによるフォロー有無の判定
        @user.following.each do |user|
          @following << { user: user, followStatus: current_user.following?(user) }
        end
        render json: { user: @user, following: @following },
               status: :ok
      end

      # フォロワーを返す
      def followers
        @user = User.find(params[:id])
        @followers = []
        # current_userによるフォロー有無の判定
        @user.followers.each do |user|
          @followers << { user: user, followStatus: current_user.following?(user) }
        end
        render json: { user: @user, followers: @followers },
               status: :ok
      end

      # 日記情報一覧を返す
      def diaries
        @user = User.find(params[:id])
        @diaries = @user.diaries
        # 必要な日記情報に調整する
        modification_diaries = []
        @diaries.map do |diary|
          # 感情によってcolorを決定
          case diary.feeling
          when 'satisfied' then color = '#67daff'
          when 'neutral_face' then color = '#03a9f4'
          when 'dizzy_face' then color = '#007ac1'
          end
          # Rechartに合わせてハッシュのkeysを設定
          modification_diaries << { color: color,
                                    groupId: diary.sleeping_hours,
                                    id: diary.id,
                                    start: diary.date,
                                    startStr: diary.date,
                                    title: diary.feeling }
        end
        modification_diaries.sort_by! { |v| v[:start] }
        render json: { user: @user, diaries: modification_diaries },
               status: :ok
      end

      # タイムラインを返す
      def timeline
        @user = User.find(params[:id])
        @timeline = []
        @user.feed.each do |micropost|
          user = User.find(micropost.user_id)
          # current_userによるいいね有無の判定
          likeStatus = current_user.liked?(micropost)
          # micropostのコメント数を検索
          commentCount = micropost.comment_ids.length
          @timeline << { micropost: micropost,
                         likeStatus: likeStatus,
                         commentCount: commentCount,
                         user: user }
        end
        render json: { timeline: @timeline },
               status: :ok
      end

      # トークルームの一覧を返す
      def rooms
        @entries = []
        current_user.entries.each do |current_entry|
          # トーク相手を検索
          Entry.where(room_id: current_entry.room_id).each do |entry|
            next unless entry.user_id != current_user.id

            @other_user = User.find(entry.user_id)
            @message = Message.order(created_at: :desc).find_by(room_id: entry.room_id)
            # 未読メッセージがあるか確認
            check_message = current_user.passive_notifications.where(action: 'message', checked: false)
            @entries << { check_message: !check_message.blank?,
                          message_content: @message.content,
                          message_created_at: @message.created_at,
                          other_user: @other_user,
                          room_id: entry.room_id }
          end
        end
        @entries.sort_by! { |array| array[:message_created_at] }.reverse!
        render json: { entries: @entries },
               status: :ok
      end

      # ユーザーの登録本を読了/積読を分類して返す
      def books
        @user = User.find(params[:id])
        @recommend_book = @user.recommend_book
        @subscriptions = @user.subscriptions
        read_books = []
        stack_books = []
        @subscriptions.map do |subscription|
          if subscription.read === true
            # 読了本をread_booksに加える
            read_books << Book.find(subscription.book_id)
          else
            # 積読本をstack_booksに加える
            stack_books << Book.find(subscription.book_id)
          end
        end
        render json: { user: @user,
                       recommend_book: @recommend_book,
                       read_books: read_books,
                       stack_books: stack_books },
               status: :ok
      end

      private

      # Strong Parameters
      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation,
                                     :ideal_sleeping_hours, :profile, :avatar)
      end

      # 管理者かどうか
      def admin_user
        unless current_user.admin?
          render json: { message: '管理者以外は実行できません' },
                 status: :forbidden
        end
      end

      # 正しいユーザーかどうか確認
      def correct_user
        @user = User.find(params[:id])
        unless current_user?(@user)
          render json: { message: 'このアカウントでは実行できません' },
                 status: :forbidden
        end
      end
    end
  end
end
