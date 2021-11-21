# frozen_string_literal: true

module Api
  module V1
    class RoomsController < ApplicationController
      before_action :logged_in_user, only: %i[show create destroy]

      def show
        # それぞれのユーザーのEntriesを取得
        @user = User.find(params[:id]) 
        @user_entries = @user.entries
        @current_user_entries = current_user.entries
        shared_room_check
        # 共有するRoomがある場合、ルーム内のメッセージを返す
        if @room.nil?
          messages = @room.messages
          render json: { messages: messages },
                 status: :ok
        else
          render json: { message: 'トークルームはありません' },
                 status: :unprocessable_entity
        end
      end

      def create
        # それぞれのユーザーのEntriesを取得
        @user = User.find(params[:room][:user_id]) 
        @user_entries = @user.entries
        @current_user_entries = current_user.entries
        shared_room_check
        # 共有するRoomがある場合、部屋の作成はスキップ
        if @room.nil?
          @room = Room.create!
          Entry.create(user_id: current_user.id, room_id: @room.id)
          Entry.create(room_params.merge(room_id: @room.id))
        end
        render json: { room: @room, is_room: @is_room },
               status: :ok
      end

      def destroy
        @room = Room.find(params[:id])
        @room.destroy
        render json: { message: 'トークルームを削除しました' },
               status: :ok
      end

      private

      # StrongParameter
      def room_params
        params.require(:room).permit(:user_id)
      end

      # current_userとuserが共有するRoomを探す
      def shared_room_check
        @current_user_entries.each do |current_user_entry|
          @user_entries.each do |user_entry|
            if current_user_entry.room_id === user_entry.room_id
              @room = Room.find(current_user_entry.room.id)
              @is_room = true
            else
              @is_room = false
            end
          end
        end
      end

    end
  end
end
