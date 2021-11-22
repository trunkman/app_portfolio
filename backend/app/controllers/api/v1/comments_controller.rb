# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      before_action :logged_in_user, only: %i[create destroy]
      before_action :correct_user,   only: [:destroy]

      def create
        @comment = current_user.comments.build(comment_params)
        @comment.image.attach(params[:comment][:image])
        if @comment.save
          @micropost = Micropost.find(params[:comment][:micropost_id])
          # コメント通知を作成
          @micropost.create_notification_comment!(current_user, @comment.id)
          render json: { comment: @comment },
                 status: :created
        else
          render json: { message: 'コメントが保存されませんでした' },
                 status: :unprocessable_entity
        end
      end

      def destroy
        @comment.destroy
        render json: { message: 'コメントを削除しました' },
               status: :ok
      end

      private

      # StrongParameter
      def comment_params
        params.require(:comment).permit(:user_id, :micropost_id, :content, :image)
      end

      # 正しいユーザーかどうか確認
      def correct_user
        @comment = current_user.comments.find_by(id: params[:id])
        if @comment.nil?
          render json: { message: 'あなたのコメントは見当たりませんでした' },
                 status: :forbidden
        end
      end
    end
  end
end
