module Api
  module V1
    class SessionsController < ApplicationController
      include SessionsHelper

      def new; end

      def create
        user = User.find_by(params[:session][:email].downcase)
        if user&.authenticated(params[:session][:password])
          log_in user
          # チェックボックスで判定する予定
          params[:session][:remember_me] == '1' ? remember(user) : forget(user)
          redirect_to user
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
