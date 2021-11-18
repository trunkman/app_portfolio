# frozen_string_literal: true

module Api
  module V1
    class LikesController < ApplicationController
      before_action :logged_in_user, only: %i[like unlike]

      def like
        @like = current_user.likes.create!(like_params)
        render json: { like: @like }, status: :ok
      end

      def unlike
        @like = current_user.likes.find_by(micropost_id: params[:like][:micropost_id])
        @like.destroy
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
