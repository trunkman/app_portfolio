# frozen_string_literal: true

module Api
  module V1
    class ImagesController < ApplicationController
      def presigned_object
        # 書名付きURLを作成
        presigned_object = S3_BUCKET.presigned_post(
          acl: 'public-read',
          content_length_range: 1..(10.megabytes),
          key: "avatar/#{SecureRandom.uuid}/#{params[:id]}",
          success_action_status: '201',
        )
        render json: { url: presigned_object.url, fields: presigned_object.fields },
               status: :ok
      end

      # def avatar
      #   test = Aws::S3::Object.new(ENV['S3_BUCKET'], params[:avatarUrl]).public_url  
      #   avatar_url = params[:avatarUrl]
      #   current_user.update(avatar: avatar_url)
      #   render json: { message: test },
      #          status: :ok
      # end

      def micropost; end
    end
  end
end
