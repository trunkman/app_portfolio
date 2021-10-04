module Api
  module V1
    class SessionsController < ApplicationController
      # def new; end

      def create
        user = User.find_by(email: params[:session][:email].downcase)
        if user&.authenticate(params[:session][:password])
          if user.activated?
            log_in user
            # params[:session][:remember_me] == '1' ? remember(user) : forget(user)
            render json: {user: user, status: :created}
          else
            render json: {}, status: :unprocessable_entity
          end
        else
          render json: {}, status: :unprocessable_entity
        end
      end

      def destroy
        log_out if logged_in?
        redirect_to root_url
      end
    end
  end
end
