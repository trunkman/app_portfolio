# frozen_string_literal: true

module Api
  module V1
    class RoomsController < ApplicationController
      before_action :logged_in_user, only: %i[show create destroy]
      before_action :correct_user,   only: [:destroy]

      # トークのメッセージ一覧を返す
      def show
        room = Room.find(params[:id])
        @messages = room.messages
        render json: { messages: @messages }, status: :ok
      end

      # トークルームを作成する
      def create
        @room = Room.create
        current_user_entry = Entry.create(user_id: current_user.id, room_id: @room.id)
        user_entry = Entry.create(room_params.merge(room_id: @room.id))
        render json: { room: @room }, status: :ok
        # unless current_user.id === user.id
        #   current_user_entries.each do |current_user_entry|
        #     user_entries.each do |user_entry|
        #       if current_user_entry.room_id === user_entry.room_id
        #         is_room = true
        #         @room_id = current_user_entry.room_id
        #       end
        #     end
        #   end
        # end
      end

      def destroy; end

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
