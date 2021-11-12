module Api
  module V1
    class PasswordResetsController < ApplicationController
      before_action :get_user,         only: %i[edit update]
      before_action :valid_user,       only: %i[edit update]
      before_action :check_expiration, only: %i[edit update]

      def create
        @user = User.find_by(email: params[:password_reset][:email].downcase)
        if @user
          @user.create_reset_digest
          @user.send_password_reset_email
          render json: { message: 'パスワードリセットを送信しました'},
                 status: :ok
        else
          render json: { message: 'アカウントが見つかりませんでした'},
                 status: :unprocessable_entity
        end
      end

      def edit; end

      def update
        if params[:user][:password].empty?
          render json: { message: 'パスワードが空です'}
        elsif @user.update(user_params)
          log_in @user
          @user.update_attribute(:reset_digest, nil)
          render json: { user: @user }, status: :ok
        else
          render json: { message: '無効なパスワードです'}
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
          render json: {}, status: :unprocessable_entity
        end
      end

      # トークンが期限切れかどうか確認する
      def check_expiration
        if @user.password_reset_expired?
          render json: { message: 'トークンの有効期限が切れています'}
        end
      end
    end
  end
end
