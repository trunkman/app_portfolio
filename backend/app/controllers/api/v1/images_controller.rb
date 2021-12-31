# frozen_string_literal: true

module Api
  module V1
    class ImagesController < ApplicationController
      # def presigned_object
      #   # 書名付きURLを作成
      #   presigned_object = S3_BUCKET.presigned_post(
      #     acl: 'public-read',
      #     content_length_range: 1..(10.megabytes),
      #     key: "avatar/#{SecureRandom.uuid}/#{params[:id]}",
      #     success_action_status: '201',
      #   )
      #   render json: { url: presigned_object.url, fields: presigned_object.fields },
      #          status: :ok
      # end

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

      def micropost
        micropost_url = params[:image][:micropost_url]
        if current_user.update(image_url: micropost_url)
          render json: { message: current_user.image_url },
                 status: :ok
        else
          render json: { message: '画像登録に失敗しました' },
                 status: :unprocessable_entity
        end
      end

      private
       # StrongParameter
      def image_params
        params.require(:image).permit(:avatar_url, :micropost_url)
      end

    end
  end
end
