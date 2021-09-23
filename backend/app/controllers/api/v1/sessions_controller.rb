module Api
  module V1 
    class SessionsController < ApplicationController
      include SessionsHelper
      
      def new
      end
      
      def create
        user = User.find_by(params[:session][:email].downcase) 
        if user&.authenicate(params[:session][:password])
          log_in(user)
          redirect_to user
        else
          render 'new'
        end
      end
      
      def destroy
        log_out(user)
        redirect_to root_url
      end

    end
  end
end
    