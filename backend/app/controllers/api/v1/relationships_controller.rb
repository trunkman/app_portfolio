module Api
  module V1
    class RelationshipsController < ApplicationController
      # before_action :logged_in_user

      def create
        user = User.find(params[:followed_id])
        current_user.follow(user)
        render json: { follow_status: :follow }, status: :ok
      end

      def destroy
        user = User.find(params[:followed_id])
        current_user.unfollow(user)
        render json: { follow_status: :unfollow }, status: :ok
      end

      def following_status
        user = User.find(params[:id])
        following = current_user.following?(user)
        render json: { follow_status: following }, status: :ok
      end
    end
  end
end
