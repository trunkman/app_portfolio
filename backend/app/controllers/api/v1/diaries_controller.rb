# frozen_string_literal: true

module Api
  module V1
    class DiariesController < ApplicationController
      before_action :logged_in_user, only: %i[create update destroy sleep_debt]
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

      def sleep_debt
        @user = User.find(params[:id])
        @diaries = @user.diaries
        # 理想の合計睡眠時間を計算
        ideal_total_time = @user.ideal_sleeping_hours * @diaries.count 
        # 実際の合計睡眠時間
        total_time = 0
        @diaries.each do |diary|
          total_time += diary.sleeping_hours
        end
        # 睡眠負債かどうか判定
        if ideal_total_time > total_time
        sleep_debt = total_time - ideal_total_time
        render json: { sleep_debt: sleep_debt},
               status: :ok
        else 
          sleep_saving = ideal_total_time - total_time

          render json: { sleep_saving: sleep_saving},
                status: :ok
        end
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
