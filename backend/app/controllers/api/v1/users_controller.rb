# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :logged_in_user, only: %i[index show edit update destroy
                                              following followers microposts
                                              rooms books diaries]
      before_action :correct_user,   only: %i[edit update]
      before_action :admin_user, only: %i[destroy]

      # ユーザー一覧を取得する
      def index
        users = User.where(activated: true)
        render json: { users: users }, status: :ok
      end

      # ユーザーページを取得する
      def show
        @user = User.find(params[:id])
        following_ids = @user.following_ids
        followers_ids = @user.follower_ids
        # following_ids = []
        # @user.following.each do |following|
        #   following_ids << following.id
        # end
        # followers_ids = []
        # @user.followers.each do |follower|
        #   followers_ids << follower.id
        # end
        if @user.activated?
          render json: { user: @user,
                         following_ids: following_ids,
                         followers_ids: followers_ids },
                 status: :ok
        else
          render json: { message: 'ユーザーのアカウントが有効化されていません' },
                 status: :unauthorized
        end
      end

      # ユーザーを登録する
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
          render json: { user: @user },
                 status: :ok
        else
          render json: { message: '更新しようとしている情報に誤りがあります' },
                 status: :unprocessable_entity
        end
      end

      # ユーザー情報を削除する
      def destroy
        User.find(params[:id]).destroy
        render json: { message: 'アカウントを削除しました' },
               status: :ok
      end

      # フォロー中のユーザーを返す
      def following
        @user = User.find(params[:id])
        users = @user.following
        following_ids = @user.following_ids
        # @following_ids = []
        # current_user.following.each do |follow|
        #   @following_ids << follow.id
        # end
        render json: { users: users, following_ids: following_ids },
               status: :ok
      end

      # フォロワーを返す
      def followers
        @user = User.find(params[:id])
        users = @user.followers
        following_ids = @user.following_ids
        # @following_ids = []
        # current_user.following.each do |follow|
        #   @following_ids << follow.id
        # end
        render json: { users: users, following_ids: following_ids },
               status: :ok
      end

      # マイクロポスト&コメント一覧を返す
      def microposts
        @user = User.find(params[:id])
        microposts = @user.microposts
        comments = @user.comments
        liked_micropost_ids = @user.liked_micropost_ids
        # liked_microposts = @user.liked_microposts
        # liked_micropost_ids = []
        # liked_microposts.each do |liked_micropost|
        #   @liked_micropost_ids << liked_micropost.id
        # end
        render json: { microposts: microposts,
                       comments: comments,
                       liked_micropost_ids: liked_micropost_ids },
               status: :ok
      end

      # トークルームの一覧を返す
      def rooms
        @user = User.find(params[:id])
        entries = @user.entries
        render json: { entries: entries }, status: :ok
      end

      # ユーザーの登録本一覧を返す(読了と積読を分ける)
      def books
        @user = User.find(params[:id])
        subscriptions = @user.subscriptions
        read_books = []
        stack_books = []
        subscriptions.map do |subscription|
          if subscription.read === true
            # 読了本をread_booksに加える
            read_books << Book.find(subscription.book_id)
          else
            # 積読本をstack_booksに加える
            stack_books << Book.find(subscription.book_id)
          end
        end
        render json: { read_books: read_books, stack_books: stack_books },
               status: :ok
      end

      def diaries
        @user = User.find(params[:id])
        diaries = @user.diaries
        # 利用する情報のみに調整する
        modification_diaries = []
        diaries.map do |diary|
          modification_diaries << { title: diary.feeling, start: diary.date }
        end
        render json: { diaries: modification_diaries }, status: :ok
      end

      private

      # Strong Parameters
      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation, :image)
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
