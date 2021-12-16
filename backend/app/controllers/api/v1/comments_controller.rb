# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      before_action :logged_in_user, only: %i[create destroy]
      before_action :correct_user,   only: [:destroy]

      # コメントを作成する
      def create
        @comment = current_user.comments.build(comment_params)
        if @comment.save
          # 通知を作成
          @micropost = Micropost.find(params[:comment][:micropost_id])
          @micropost.create_notification_comment!(current_user, @comment.id)
          render json: { comment: @comment },
                 status: :created
        else
          render json: { message: 'コメントが保存されませんでした' },
                 status: :unprocessable_entity
        end
      end

      # コメントを削除する
      def destroy
        @comment.destroy
        render json: { message: 'コメントを削除しました' },
               status: :ok
      end

      private

      # StrongParameter
      def comment_params
        params.require(:comment).permit(:user_id, :micropost_id, :content)
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
