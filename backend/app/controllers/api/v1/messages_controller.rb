# frozen_string_literal: true

module Api
  module V1
    class MessagesController < ApplicationController
      before_action :logged_in_user, only: %i[create]

      # メッセージを作成する
      def create
        @message = current_user.messages.build(message_params)
        if @message.save
          # 通知を作成する
          Entry.where(room_id: @message.room_id).each do |entry|
            if entry.user_id != current_user.id
              @other_user_id = entry.user_id
            end  
          end
          # 通知相手を特定する
          other_user_id = Entry.select("user_id")
                                .where("room_id = ? " , params[:message][:room_id])
                                .where.not("user_id = ? " , current_user.id)
          @message.create_notification_message!(current_user, other_user_id)
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
