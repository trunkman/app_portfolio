module Api
  module V1
    class CommentsController < ApplicationController
      before_action :logged_in_user, only: %i[create destroy]
      before_action :correct_user,   only: [:destroy]

      def create
        @comment = current_user.comments.build(comment_params)
        @comment.image.attach(params[:comment][:image])
        if @comment.save
          render json: { comment: @comment }, status: :ok
        else
          render status: :unprocessable_entity
        end
      end
      
      def destroy
        @comment.destroy
        render json: { message: '削除完了' }, status: :ok
      end

      private

      # StrongParameter
      def comment_params
        params.require(:comment).permit(:user_id, :micropost_id, :content, :image)
      end

      # 本人のコメントであるかを確認
      def correct_user
        @comment = current_user.comments.find_by(id: params[:id])
        render json: {}, status: :unauthorized if @comment.nil?
      end

    end
  end
end
