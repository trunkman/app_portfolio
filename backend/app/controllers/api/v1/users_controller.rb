module Api
  module V1
    class UsersController < ApplicationController
      before_action :logged_in_user, only: %i[index edit update destroy]
      before_action :correct_user,   only: %i[edit]
      before_action :admin_user,     only: :destroy

      # def index
      #   @users = User.where(activated: true)
      #   render json: { users: @users }, status: :ok
      # end

      # ユーザーを表示するアクション
      def show
        @user = User.find(params[:id])
        if @user.activated?
          render json: { user: @user, status: :ok }
        else
          render json: { status: :internal_server_error }
          # redirect_to root_url and return unless user.activated?
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
          render json: { logged_in: true,
                         user: @user },
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
                 status: :created
        else
          render json: { errors: @user.errors.full_messages }, 
                 status: :unprocessable_entity
        end
      end

      def destroy
        if User.find(params[:id]).destroy
          render json: { status: :ok }
        else
          render json: { status: :internal_server_error }
        end
      end

      private

      # Strong Parameters
      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
      end

      # 管理者かどうか
      def admin_user
        redirect_to(root_url) unless current_user.admin?
      end
    end
  end
end
