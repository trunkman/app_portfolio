# frozen_string_literal: true

module Api
  module V1
    class MicropostsController < ApplicationController
      before_action :logged_in_user, only: %i[create destroy]
      before_action :correct_user,   only: [:destroy]

      # 投稿を作成する
      def create
        @micropost = current_user.microposts.build(micropost_params)
        @micropost.image.attach(params[:micropost][:image])
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

      # 支障がなければ削除する
      # def liked_micropost
      #   @liked_micropost = Like.find_by(user_id: @current_user.id, micropost_id: params[:id])
      #   render json: { liked_micropost: @liked_micropost.nil? }, status: :ok
      # end

      private

      # StrongParameter
      def micropost_params
        params.require(:micropost).permit(:content, :image)
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
