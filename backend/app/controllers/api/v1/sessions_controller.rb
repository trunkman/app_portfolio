module Api
  module V1
    class SessionsController < ApplicationController
      def new; end

      def create
        user = User.find_by(params[:session][:email].downcase)
        if user&.authenticated(params[:session][:password])
          if user.activated?
            log_in user
            params[:session][:remember_me] == '1' ? remember(user) : forget(user)
            redirect_back_or user
          else
            redirect_to root_url
          end
        else
          render 'new'
        end
      end

      def destroy
        log_out if logged_in?
        redirect_to root_url
      end
    end
  end
end
