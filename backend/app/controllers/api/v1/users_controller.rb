# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :logged_in_user, only: %i[index show edit update destroy
                                              microposts following followers
                                              diaries timeline rooms books ]
      before_action :correct_user,   only: %i[edit update]

      # ユーザー一覧を表示する
      def index
        users = User.where(activated: true)
        users_civilized = users.map do |user|
          user.civilized
        end
        render json: { users: users_civilized }, status: :ok
      end

      # ユーザープロフィールを表示する
      def show
        @user = User.find(params[:id])
        # フォロワー・マイブック情報等を追加
        @following_ids = @user.following_ids
        @followers_ids = @user.follower_ids
        follow_status = current_user.following?(@user)
        @subscriptions = @user.subscriptions
        if @user.activated?
          render json: { user: @user.civilized,
                         following_ids: @following_ids,
                         followers_ids: @followers_ids,
                         follow_status: follow_status,
                         read_books: @subscriptions.where(read: true),
                         stack_books: @subscriptions.where(read: false) },
                 status: :ok
        else
          render json: { message: 'ユーザーのアカウントが有効化されていません' },
                 status: :unauthorized
        end
      end

      # ユーザーを作成し、アカウント有効化メールを送信する
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

      # ユーザー情報を更新する
      def update
        @user = User.find(params[:id])
        if @user.update(user_params)
          render json: { user: @user.civilized },
                 status: :ok
        else
          render json: { message: '更新する情報に誤りがあります' },
                 status: :unprocessable_entity
        end
      end

      # ユーザー情報を削除する
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

      # 投稿&いいねした投稿&コメント一覧を返す
      def microposts
        @user = User.find(params[:id])
        # 投稿の追加
        @microposts = []
        @user.microposts.each do |post|
          likeStatus = current_user.liked?(post)
          commentCount = post.comment_ids.count
          @microposts << { micropost: post,
                           likeStatus: likeStatus,
                           commentCount: commentCount }
        end
        # いいねした投稿の追加
        @liked_microposts = []
        @user.liked_microposts.each do |post|
          user = post.user
          commentCount = post.comment_ids.count
          @liked_microposts << { liked_micropost: post,
                                 likeStatus: true,
                                 commentCount: commentCount,
                                 user: user.civilized }
        end
        # コメントの追加
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
        # ログインユーザーによるフォロー有無の判定
        @user.following.each do |user|
          @following << { user: user.civilized, followStatus: current_user.following?(user) }
        end
        render json: { user: @user.civilized, following: @following },
               status: :ok
      end

      # フォロワーを返す
      def followers
        @user = User.find(params[:id])
        @followers = []
        # ログインユーザーによるフォロー有無の判定
        @user.followers.each do |user|
          @followers << { user: user.civilized, followStatus: current_user.following?(user) }
        end
        render json: { user: @user.civilized, followers: @followers },
               status: :ok
      end

      # 睡眠日記一覧を返す
      def diaries
        @user = User.find(params[:id])
        @diaries = @user.diaries
        # 利用しやすいように日記情報を調整
        modification_diaries = []
        @diaries.map do |diary|
          # 感情によってcolorを決定
          case diary.feeling
          when 'satisfied' then color = '#67daff'
          when 'neutral_face' then color = '#03a9f4'
          when 'dizzy_face' then color = '#007ac1'
          end
          # Rechartが利用できるようにハッシュのkeysを設定
          modification_diaries << { color: color,
                                    groupId: diary.sleeping_hours,
                                    id: diary.id,
                                    start: diary.date,
                                    startStr: diary.date,
                                    title: diary.feeling }
        end
        modification_diaries.sort_by! { |v| v[:start] }
        render json: { user: @user.civilized, diaries: modification_diaries },
               status: :ok
      end

      # タイムラインを返す
      def timeline
        @user = User.find(params[:id])
        @timeline = []
        @user.feed.each do |micropost|
          user = User.find(micropost.user_id)
          # ログインユーザーにによるいいね有無の判定
          likeStatus = current_user.liked?(micropost)
          # 投稿に対するコメント数を検索
          commentCount = micropost.comment_ids.length
          @timeline << { micropost: micropost,
                         likeStatus: likeStatus,
                         commentCount: commentCount,
                         user: user.civilized }
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
            next if entry.user_id === current_user.id

            @other_user = User.find(entry.user_id)
            @message = Message.order(created_at: :desc).find_by(room_id: entry.room_id)
            # 未読メッセージがあるか確認
            check_message = current_user.passive_notifications.where(visitor_id: @other_user.id,
                                                                     action: 'message',
                                                                     checked: false)
            next if @message.nil?
            # 利用しやすいようにentry情報を調整
            @entries << { message_created_at: @message[:created_at],
                          check_message: check_message.any?,
                          message: @message,
                          other_user: @other_user.civilized,
                          room_id: entry.room_id }
          end
        end
        # メッセージを最新順に並び替える
        @entries.sort_by! { |entry| entry[:message_created_at] }.reverse!
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
        render json: { user: @user.civilized,
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
