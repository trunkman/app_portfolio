module Api
  module V1
    class RoomsController < ApplicationController
      before_action :logged_in_user, only: %i[show create destroy]
      before_action :correct_user,   only: [:destroy]

      def show
          @messages = Message.find_by(room_id: params[:room][:id])
          render json: { messages: @messages }, status: :ok
      end

      def create
        @room = Room.create
        current_user_entry = Entry.create(user_id: current_user.id, room_id: @room.id)
        user_entry = Entry.create(room_params.merge(room_id: @room.id))
        render json: { room: @room }, status: :ok
      end

      def destroy
      end

      private

      # StrongParameter
      def room_params
        params.require(:room).permit(:user_id)
      end

      # 本人が所属するルームであるかを確認
      def correct_user
        @room = current_user.entries.find_by(room_id: room.id)
        render json: {}, status: :unauthorized if @room.nil?
      end
    end
  end
end

