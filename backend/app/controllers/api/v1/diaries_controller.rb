# frozen_string_literal: true

module Api
  module V1
    class DiariesController < ApplicationController
      before_action :logged_in_user, only: %i[create update destroy sleep_debt]
      before_action :correct_user,   only: %i[update destroy]

      # 睡眠日記を作成する
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

      # 睡眠日記を更新する
      def update
        @diary.update(diary_params)
        render json: { diary: @diary },
               status: :ok
      end
      
      # 睡眠日記を削除する
      def destroy
        @diary.destroy
        render json: { message: '日記の削除が完了しました' },
               status: :ok
      end

      # 睡眠負債/貯蓄した睡眠を算出して返す
      def sleep_debt
        @user = User.find(params[:id])
        user_sleep_time
        # 理想の合計睡眠時間の方が多い場合、sleep_debtとして返す
        if @ideal_total_time > @total_time
          sleep_debt = @ideal_total_time - @total_time
          render json: { sleep_debt: sleep_debt.round(2) },
                 status: :ok
        # 実際の合計睡眠時間の方が多い場合、sleep_savingとして返す
        else
          sleep_saving = @total_time - @ideal_total_time
          render json: { sleep_saving: sleep_saving.round(2) },
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

      # 理想の合計睡眠時間と実際の合計睡眠時間を算出する
      def user_sleep_time
        @diaries = @user.diaries
        # 理想の合計睡眠時間
        @ideal_total_time = @user.ideal_sleeping_hours * @diaries.count
        # 実際の合計睡眠時間
        @total_time = 0
        @diaries.each do |diary|
          @total_time += diary.sleeping_hours
        end
      end
    end
  end
end
