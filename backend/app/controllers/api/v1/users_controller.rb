module Api
  module V1
    class UsersController < ApplicationController

      def index
        @user = User.all
        render json: { users: @user }, status: :ok
      end

      def new

      end

    end
  end
end
