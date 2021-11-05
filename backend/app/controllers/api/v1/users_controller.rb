module Api
  module V1
    class UsersController < ApplicationController
      before_action :logged_in_user, only: %i[index edit update destroy] # following, followersを一時削除
      before_action :correct_user,   only: %i[edit update]
      before_action :admin_user,     only: :destroy

      def index
        @users = User.where(activated: true)
        render json: { users: @users }, status: :ok
      end

      # ユーザーを表示するアクション
      def show
        @user = User.find(params[:id])
        @microposts = @user.microposts
        @following = @user.following
        @followers = @user.followers
        if @user.activated?
          render json: { user: @user, microposts: @microposts,
                         following: @following, followers: @followers }, status: :ok
        else
          render json: {}, status: :unauthorized
        end
      end

      # def new
      #   @user = User.new
      #   render json: { user: @user }, status: :ok
      # end

      # ユーザーを登録するアクション
      def create
        @user = User.new(user_params)
        if @user.save
          # @user.send_activation_email(メール実装は後でする)
          @user.activate
          log_in @user
          render json: { logged_in: true, user: @user },
                 status: :created
        else
          render json: { errors: @user.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      # def edit
      #   @user = User.find(@params[:id])
      # end

      def update
        @user = User.find(params[:id])
        if @user.update(user_params)
          render json: { user: @user },
                 status: :ok
        else
          render json: { errors: @user.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      def destroy
        if User.find(params[:id]).destroy
          render json: { message: '削除完了' },
                 status: :no_content
        else
          render json: { message: '削除失敗' },
                 status: :not_found
        end
      end

      # フォローされている方を返す
      def following
        @title = 'Following'
        user = User.find(params[:id])
        @users = user.following
        render json: { title: @title, users: @users }, status: :ok
      end

      # フォロワーを返す
      def followers
        @title = 'Followers'
        user = User.find(params[:id])
        @users = user.followers
        render json: { title: @title, users: @users }, status: :ok
      end

      # マイクロポスト&コメント一覧を返す
      def microposts
        user = User.find(params[:id])
        @microposts = user.microposts
        @comments = user.comments
        render json: { microposts: @microposts, comments: @comments }, status: :ok
      end

      # トークルームの一覧を返す
      def rooms
        user = User.find(params[:id])
        @rooms = Room.entries.find_by(user_id: params[:user][:id])
        render json: { rooms: @rooms  }, status: :ok 
        # user = User.find(params[:id])
        # current_user_entries = Entry.where(user_id: current_user.id)
        # user_entries = Entry.where(user_id: user.id)
        # unless current_user.id === user.id
        #   current_user_entries.each do |current_user_entry|
        #     user_entries.each do |user_entry|
        #       if current_user_entry.room_id === user_entry.room_id 
        #         is_room = true
        #         @room_id = current_user_entry.room_id
        #       end
        #     end
        #   end
        # end
      end

      private

      # Strong Parameters
      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation, :image)
      end

      # 管理者かどうか
      def admin_user
        unless current_user.admin?
          render json: { message: '管理者ではない' },
                 status: :unauthorized
        end
      end

      # 正しいユーザーかどうか確認
      def correct_user
        @user = User.find(params[:id])
        render json: {}, status: :unauthorized unless current_user?(@user)
      end
    end
  end
end
