module Api
  module V1
    class SessionsController < ApplicationController
      # ログインするアクション
      def create
        user = User.find_by(email: params[:session][:email].downcase)
        if user&.authenticate(params[:session][:password])
          if user.activated?
            log_in user
            params[:session][:remember_me] == '1' ? remember(user) : forget(user)
            render json: { logged_in: true, user: user },
                   status: :created
          else
            render json: { error: 'activatedされていません' },
                   status: :unauthorized
          end
        else
          render json: { error: 'emailまたはパスワードが違います' },
                 status: :unprocessable_entity
        end
      end

      # ログアウトするアクション
      def destroy
        log_out # if logged_in?
      end

      # ログイン状態を返すアクション
      def logged_in?
        current_user
        if @current_user
          render json: { logged_in: true, user: @current_user },
                 status: :ok
        else
          render json: { logged_in: false, message: 'ログインしていません' },
                 status: :unauthorized
        end
      end
    end
  end
end
