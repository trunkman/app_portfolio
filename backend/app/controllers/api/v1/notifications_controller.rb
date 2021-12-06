# frozen_string_literal: true

module Api
  module V1
    class NotificationsController < ApplicationController
      before_action :logged_in_user, only: %i[index all_delete check]

      # ユーザーが受けた通知をすべて返す
      def index
        @notifications = current_user.passive_notifications
        @notifications.where(checked: false).where.not(action: 'message').each do |notification|
          notification.update_attribute(:checked, true)
        end
        render json: { notifications: @notifications },
               status: :ok
      end

      # チェック済み通知を全て削除する
      def all_delete
        @checked_notifications = current_user.passive_notifications.where(checked: true)
        if @checked_notifications.destroy_all
          render json: { message: '通知を削除しました' },
                 status: :ok
        else
          render json: { message: '削除する通知がありませんでした' },
                 status: :ok
        end
      end

      # ユーザーの新規通知有無を返す
      def check
        @notifications = current_user.passive_notifications
        check_all = @notifications.where(checked: false).where.not(action: 'message')
        check_message = @notifications.where(action: 'message', checked: false)
        render json: { check_all: !check_all.blank?, check_message: !check_message.blank? },
               status: :ok
      end
    end
  end
end
