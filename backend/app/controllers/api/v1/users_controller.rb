module Api
  module V1
    class UsersController < ApplicationController
      before_action :logged_in_user, only: %i[index edit update destroy]
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
        if @user.activated?
          render json: { user: @user , microposts: @microposts  }, status: :ok
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
          unless current_user?(@user)
            render json: {}, status: :unauthorized
          end
        end
      end

  end
end
