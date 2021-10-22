module Api
  module V1
    class MicropostsController < ApplicationController
      before_action :logged_in_user, only: %i[create destroy]
      before_action :correct_user,   only: [:destroy]

      def create
        @micropost = current_user.microposts.build(micropost_params)
        @micropost.image.attach(params[:micropost][:image])
        if @micropost.save
          render json: { micropost: @micropost }, status: :ok
        else
          render status: :unprocessable_entity
        end
      end

      def destroy; 
        @micropost.destroy
        render json: { message: '削除完了' },
               status: :no_content
      end

      private

      def micropost_params
        params.require(:micropost).permit(:content, :image)
      end

    end
  end
end
