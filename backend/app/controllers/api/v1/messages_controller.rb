# frozen_string_literal: true

module Api
  module V1
    class MessagesController < ApplicationController
      before_action :logged_in_user, only: %i[create]

      def create
        @message = current_user.messages.build(message_params)
        if @message.save
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
