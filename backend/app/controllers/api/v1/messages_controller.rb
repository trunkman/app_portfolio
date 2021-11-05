module Api
  module V1
    class MessagesController < ApplicationController
      before_action :logged_in_user, only: %i[create destroy]
      before_action :correct_user,   only: [:destroy]

      def create
        @message = current_user.messages.build(message_params)
        if @message.save
          render json: { message: @message }, status: :ok
        else
          render status: :unprocessable_entity
        end
      end 

      # def destroy
      #   @message.destroy
      #   render json: { message: '削除完了' }, status: :ok
      # end

      private

      # StrongParameter
      def message_params
        params.require(:message).permit(:content, :user_id, :room_id)
      end

      # 本人のメッセージであるかを確認
      # def correct_user
      #   @message = current_user.messages.find_by(id: params[:id])
      #   render json: {}, status: :unauthorized if @message.nil?
      # end
    end
  end
end
