# frozen_string_literal: true

module Api
  module V1
    class ImagesController < ApplicationController
      def avatar
        avatar_url = params[:image][:avatar_url]
        if current_user.update(avatar_url: avatar_url)
          render json: { message: current_user.avatar_url },
                 status: :ok
        else
          render json: { message: '画像登録に失敗しました' },
                 status: :unprocessable_entity
        end
      end

      private

      # StrongParameter
      def image_params
        params.require(:image).permit(:avatar_url)
      end
    end
  end
end
