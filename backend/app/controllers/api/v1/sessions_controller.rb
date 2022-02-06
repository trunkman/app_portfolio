# frozen_string_literal: true

module Api
  module V1
    class SessionsController < ApplicationController
      # ログインする
      def create
        user = User.find_by(email: params[:session][:email].downcase)
        if user&.authenticate(params[:session][:password])
          if user.activated?
            log_in user
            params[:session][:remember_me] == '1' ? remember(user) : forget(user)
            render json: { logged_in: true, user: user.civilized },
                   status: :created
          else
            render json: { message: 'activatedされていません' },
                   status: :unauthorized
          end
        else
          render json: { message: 'emailまたはパスワードが違います' },
                 status: :unprocessable_entity
        end
      end

      # ログアウトする
      def destroy
        if logged_in?
          log_out
          render json: { message: 'ログアウトを完了しました' },
                 status: :ok
        end
      end

      # ログイン状態を返す
      def logged_in
        if current_user
          render json: { logged_in: true, user: @current_user.civilized },
                 status: :ok
        else
          render json: { logged_in: false, message: 'ログインしていません' },
                 status: :accepted
        end
      end
    end
  end
end
