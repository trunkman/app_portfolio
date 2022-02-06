# frozen_string_literal: true

module Api
  module V1
    class RoomsController < ApplicationController
      before_action :logged_in_user, only: %i[show create destroy]

      # トークルームを返す
      def show
        # ログインユーザーが属するroomであるか判定
        if Entry.find_by(user_id: current_user.id, room_id: params[:id])
          @messages = Message.where(room_id: params[:id])
          # 相手ユーザーの情報を取得
          other_user_id = Entry.select('user_id')
                               .where(room_id: params[:id])
                               .where.not(user_id: current_user.id)
          @other_user = User.find_by(id: other_user_id)
          # 未読メッセージがあれば既読にする
          @notifications = current_user.passive_notifications.where(visitor_id: @other_user.id,
                                                                    action: 'message',
                                                                    checked: false)
          @notifications.each do |notification|
            notification.update_attribute(:checked, true)
          end
          render json: { messages: @messages, user: @other_user.civilized },
                 status: :ok
        else
          render json: { message: 'あなたのトークルームではありません' },
                 status: :unprocessable_entity
        end
      end

      # トークルームを作成する
      def create
        # それぞれのユーザーのEntries(中間テーブル)を取得
        @user = User.find(params[:room][:user_id])
        @user_entries = @user.entries
        @current_user_entries = current_user.entries
        # 共有するRoomがあるか検索
        shared_room_check
        if @room.nil?
          @room = Room.create!
          @entry = Entry.create(user_id: current_user.id, room_id: @room.id)
          Entry.create(room_params.merge(room_id: @room.id))
          # トークルーム作成の通知をつくる
          @entry.create_notification_entry!(current_user, @user.id)
        end
        render json: { room: @room, is_room: @is_room },
               status: :ok
      end

      # トークルームを削除する
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

      # ログインユーザーと相手ユーザーが共有するRoomを検索
      def shared_room_check
        @current_user_entries.each do |current_user_entry|
          @user_entries.each do |user_entry|
            if current_user_entry.room_id == user_entry.room_id
              @room = Room.find(current_user_entry.room_id)
              @is_room = true
            end
          end
        end
      end
    end
  end
end
