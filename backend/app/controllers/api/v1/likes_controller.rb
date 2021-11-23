# frozen_string_literal: true

module Api
  module V1
    class LikesController < ApplicationController
      before_action :logged_in_user, only: %i[like unlike]

      # いいねを作成する
      def like
        @like = current_user.likes.build(like_params)
        if @like.save
          # 通知を作成
          @micropost = Micropost.find(params[:like][:micropost_id])
          @micropost.create_notification_like!(current_user)
          render json: { like: @like },
                 status: :created
        else
          render json: { message: 'いいねができませんでした' },
                 status: :unprocessable_entity
        end
      end

      # いいねを解除する
      def unlike
        @like = Like.find_by(user_id: current_user.id,
                              micropost_id: params[:like][:micropost_id])
        @like.destroy
        render json: { message: 'いいねを削除しました' },
               status: :ok
      end

      private

      # StrongParameter
      def like_params
        params.require(:like).permit(:user_id, :micropost_id)
      end

    end
  end
end
