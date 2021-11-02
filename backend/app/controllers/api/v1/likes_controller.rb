module Api
  module V1
    class LikesController < ApplicationController
      before_action :logged_in_user, only: %i[create destroy]

      def create
        @like = current_user.likes.create!(like_params)
        render json: { like: @like }, status: :ok
      end

      def destroy
        @like = current_user.likes.find_by(id: params[:id])
        render json: { message: 'いいね削除' }, status: :ok
      end

      private

      # StrongParameter
      def like_params
        params.require(:like).permit(:user_id, :micropost_id)
      end

    end
  end
end
