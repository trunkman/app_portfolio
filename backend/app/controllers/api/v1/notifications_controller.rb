# frozen_string_literal: true

module Api
  module V1
    class NotificationsController < ApplicationController
      before_action :logged_in_user, only: %i[index all_delete]
      
      # ユーザーが受けた通知をすべて返す
      def index
        @notifications = current_user.passive_notifications
         @notifications.where(checked: false).each do |notification|
          notification.update_attributes(checked: true)
        end
        render json: { notifications: @notifications },
                status: :ok
      end

      # チェック済み通知を全て削除する
      def all_delete
        @notifications = current_user.passive_notifications
        if @notifications.where(checked: false).destroy_all
          render json: { message: '通知を削除しました' },
                  status: :ok
        else
          render json: { message: '削除する通知がありませんでした' },
                  status: :ok
        end
        
      end

    end
  end
end
