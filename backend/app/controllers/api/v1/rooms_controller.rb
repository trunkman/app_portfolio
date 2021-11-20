# frozen_string_literal: true

module Api
  module V1
    class RoomsController < ApplicationController
      before_action :logged_in_user, only: %i[show create destroy]

      # トークのメッセージ一覧を返す
      def show
        room = Room.find(params[:id])
        @messages = room.messages
        render json: { messages: @messages }, status: :ok
      end

      # トークルームを作成する
      def create
        # それぞれのユーザーのEntry一覧を取得する
        current_user_entries = current_user.entries
        @user = User.find(params[:user][:id])
        user_entries = @user.entries
        # 一致するroom_idがあるかを判定
        current_user_entries.each do |current_user_entry|
          user_entries.each do |user_entry|
            # 一致する場合、room_idを返す
            if current_user_entry.room_id === user_entry.room_id
              @room = current_user_entry.room_id
              is_room = true
            # 一致しない場合、新規Roomと各ユーザーのEntryを作成する
            else
              @room = Room.create!
              Entry.create(user_id: current_user.id, room_id: @room.id)
              Entry.create(room_params.merge(room_id: @room.id))
            end
            render json: { room: @room, is_room: is_room }, status: :ok
          end
        end
      end

      # 管理者のみ削除する
      # def destroy
      #   if current_user.admin?
      #     @room = Room.find(param[:id])
      #     render json: { message: 'トークルームを削除しました' }, status: :ok
      #   else
      #     render json: { message: '管理者以外は実行できません' },
      #            status: :forbidden
      #   end
      # end

      private

      # StrongParameter
      def room_params
        params.require(:room).permit(:user_id)
      end
    end
  end
end
