module Api
  module V1
    class PasswordResetsController < ApplicationController
      before_action :get_user,         only: %i[edit update]
      before_action :valid_user,       only: %i[edit update]
      before_action :check_expiration, only: %i[edit update]

      def new; end

      def create
        @user = User.find_by(email: params[:password][:email].downcase)
        if @user
          @user.create_reset_digest
          @user.create_password_reset_email
          redirect_to root_url
        else
          render 'new'
        end
      end

      def edit; end

      def update
        if params[:user][:password].empty?
          @user.error.add(:password, :blank)
          render 'edit'
        elsif @user.update(user_params)
          log_in @user
          @user.update_attribute(:reset_digest, nil)
          redirect_to @user
        else
          render 'edit'
        end
      end

      private

      def user_params
        params.require(:user).permit(:password, :password_confirmation)
      end

      def get_user
        @user = User.find_by(email: params[:email])
      end

      # 有効なユーザーかどうか確認する
      def valid_user
        unless @user && @user.activated? &&
               @user.authenticated?(:reset, params[:id])
          redirect_to root_url
        end
      end

      # トークンが期限切れかどうか確認する
      def check_expiration
        redirect_to api_v1_new_password_reset_url if @user.password_reset_expired?
      end
    end
  end
end
