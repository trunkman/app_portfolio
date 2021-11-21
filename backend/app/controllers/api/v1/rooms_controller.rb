# frozen_string_literal: true

module Api
  module V1
    class RoomsController < ApplicationController
      before_action :logged_in_user, only: %i[create destroy talk_room]

      def create
        # それぞれのユーザーのEntry一覧を取得する
        current_user_entries = current_user.entries
        @user = User.find(room_params)
        user_entries = @user.entries
        # 一致するroom_idがあるかを判定
        current_user_entries.each do |current_user_entry|
          user_entries.each do |user_entry|
            # 一致する場合、room_idを返す
            if current_user_entry.room_id === user_entry.room_id
              @room = current_user_entry.room_id
              is_room = true
            else
              @room = Room.create!
              Entry.create(user_id: current_user.id, room_id: @room.id)
              Entry.create(room_params.merge(room_id: @room.id))
            end
          end
        end
        render json: { room: @room, is_room: is_room },
               status: :ok
      end

      def destroy
        @room = Room.find(params[:id])
        @room.destroy
        render json: { message: 'トークルームを削除しました' },
               status: :ok
      end

      # トークルームのメッセージ一覧を返す
      def talk_room
        # それぞれのユーザーのEntry一覧を取得する
        current_user_entries = current_user.entries
        @user = User.find(params[:id])
        user_entries = @user.entries
        # 一致するroom_idがあるかを判定
        current_user_entries.each do |current_user_entry|
          user_entries.each do |user_entry|
            # 一致する場合、room_idを返す
            if current_user_entry.room_id === user_entry.room_id
              @room = current_user_entry.room_id
              is_room = true
            end
          end
        end
        if @room.nil?
          render json: { message: 'トークルームはありません' },
                 status: :unprocessable_entity
        end
        messages = @room.messages
        render json: { messages: messages },
               status: :ok
      end

      private

      # StrongParameter
      def room_params
        params.require(:room).permit(:user_id)
      end
    end
  end
end
