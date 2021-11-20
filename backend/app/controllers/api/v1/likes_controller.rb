# frozen_string_literal: true

module Api
  module V1
    class LikesController < ApplicationController
      before_action :logged_in_user, only: %i[like unlike]
      before_action :correct_user,   only: [:destroy]

      def like
        @like = current_user.likes.build(like_params)
        if @like.save
          render json: { like: @like },
                 status: :ok
        else
          render json: { message: 'いいねができませんでした' },
                 status: :unprocessable_entity
        end
      end

      def unlike
        @like.destroy
        render json: { message: 'いいねを削除しました' },
               status: :ok
      end

      private

      # StrongParameter
      def like_params
        params.require(:like).permit(:user_id, :micropost_id)
      end

      # 正しいユーザーかどうか確認
      def correct_user
        @like = current_user.likes.find_by(micropost_id: params[:like][:micropost_id])
        if @like.nil?
          render json: { message: 'あなたのいいねは見当たりませんでした' },
                 status: :forbidden
        end
      end
    end
  end
end
