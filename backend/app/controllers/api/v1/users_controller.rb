module Api
  module V1
    class UsersController < ApplicationController
      # getメソッド
      def index
        @user = User.all
        render json: { users: @user }, status: :ok
      end

      def show
        @user = User.find(params[:id]) 
        render json: { users: @user }, status: :ok
      end

      def new
        @user = User.new
        render json: { users: @user }, status: :ok
      end

      # postメソッド
      def create
        @user = User.new(paramas[user_params])
        if @user.save
          log_in @user
          redirect_to @user
        else
          render 'new'  
        end


      private
        
      # Strong Parameters
        def user_params
          params.require(:user).permit(:name, :email, :password, :password_confirmation)
        end
      
    end
  end
end
