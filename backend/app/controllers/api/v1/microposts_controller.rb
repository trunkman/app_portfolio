# frozen_string_literal: true

module Api
  module V1
    class MicropostsController < ApplicationController
      before_action :logged_in_user, only: %i[show create destroy]
      before_action :correct_user,   only: [:destroy]

      # 投稿を表示する
      def show
        @micropost = Micropost.find(params[:id])
        @user = @micropost.user
        # いいねとコメント情報を追加
        likeStatus = current_user.liked?(@micropost)
        @comments = []
        @micropost.comments.each do |comment|
          user = User.find(comment.user_id)
          @comments << { comment: comment, user: user }
        end
        render json: { micropost: @micropost,
                       user: @user,
                       likeStatus: likeStatus,
                       comments: @comments },
               status: :ok
      end

      # 投稿を作成する
      def create
        @micropost = current_user.microposts.build(micropost_params)
        if @micropost.save
          render json: { micropost: @micropost },
                 status: :created
        else
          render json: { message: '投稿が保存されませんでした' },
                 status: :unprocessable_entity
        end
      end

      # 投稿を削除する
      def destroy
        @micropost.destroy
        render json: { message: '投稿を削除しました' },
               status: :ok
      end

      private

      # StrongParameter
      def micropost_params
        params.require(:micropost).permit(:content, :image_url)
      end

      # 正しいユーザーかどうか確認
      def correct_user
        @micropost = current_user.microposts.find_by(id: params[:id])
        if @micropost.nil?
          render json: { message: 'あなたの投稿は見当たりませんでした' },
                 status: :forbidden
        end
      end
    end
  end
end
