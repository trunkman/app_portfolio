# frozen_string_literal: true

module Api
  module V1
    class MessagesController < ApplicationController
      before_action :logged_in_user, only: %i[create]

      # メッセージを作成する
      def create
        @message = current_user.messages.build(message_params)
        if @message.save
          # メッセージ通知を作成する
          other_entry = Entry.where(room_id: @message.room_id).where.not(user_id: current_user.id)
          @message.create_notification_message!(current_user, other_entry[0].user_id)
          render json: { message: @message },
                 status: :ok
        else
          render json: { error: 'メッセージが送れませんでした' },
                 status: :unprocessable_entity
        end
      end

      private

      # StrongParameter
      def message_params
        params.require(:message).permit(:content, :user_id, :room_id)
      end
    end
  end
end
