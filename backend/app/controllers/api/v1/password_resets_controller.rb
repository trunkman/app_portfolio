# frozen_string_literal: true

module Api
  module V1
    class PasswordResetsController < ApplicationController
      before_action :get_user,         only: %i[update]
      before_action :valid_user,       only: %i[update]
      before_action :check_expiration, only: %i[update]

      # パスワード再設定メールを送る
      def create
        @user = User.find_by(email: params[:password_reset][:email].downcase)
        if @user
          @user.create_reset_digest
          @user.send_password_reset_email
          render json: { message: 'パスワード再設定メールを送信しました' },
                 status: :ok
        else
          render json: { message: 'アカウントが見つかりませんでした' },
                 status: :unprocessable_entity
        end
      end

      # パスワード再設定する
      def update
        if params[:user][:password].empty?
          render json: { message: 'パスワードが空です' }
        elsif @user.update(user_params)
          log_in @user
          @user.update_attribute(:reset_digest, nil)
          render json: { user: @user.civilized },
                 status: :ok
        else
          render json: { message: '無効なパスワードです' },
                 status: :unprocessable_entity
        end
      end

      private

      # Strong Parameters
      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end

      # ユーザーを取得する
      def get_user
        @user = User.find_by(email: params[:user][:email])
      end

      # 有効なユーザーかどうか確認する
      def valid_user
        unless @user&.activated? && @user&.authenticated?(:reset, params[:id])
          render json: { message: '有効化されたユーザーではありません' },
                 status: :unprocessable_entity
        end
      end

      # トークンが期限切れかどうか確認する
      def check_expiration
        if @user.password_reset_expired?
          render json: { message: 'トークンの有効期限が切れています' },
                 status: :ok
        end 
      end
    end
  end
end
