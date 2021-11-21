# frozen_string_literal: true

module Api
  module V1
    class DiariesController < ApplicationController
      before_action :logged_in_user, only: %i[create update destroy]
      before_action :correct_user,   only: %i[update destroy]

      def create
        @diary = current_user.diaries.build(diary_params)
        if @diary.save
          render json: { diary: @diary },
                 status: :created
        else
          render json: { message: '日記の登録ができませんでした' },
                 status: :unprocessable_entity
        end
      end

      def update
        @diary.update(diary_params)
        render json: { diary: @diary },
               status: :ok
      end

      def destroy
        @diary.destroy
        render json: { message: '日記の削除が完了しました' },
               status: :ok
      end

      private

      # StrongParameter
      def diary_params
        params.require(:diary).permit(:date, :sleeping_hours, :feeling)
      end

      # 正しいユーザーかどうか確認
      def correct_user
        @diary = current_user.diaries.find_by(id: params[:id])
        if @diary.nil?
          render json: { message: 'あなたの日記は見当たりませんでした' },
                 status: :forbidden
        end
      end
    end
  end
end
