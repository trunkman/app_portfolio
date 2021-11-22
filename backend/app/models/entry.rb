# frozen_string_literal: true

class Entry < ApplicationRecord
  # 関連付け
  belongs_to :user
  belongs_to :room
  has_many :notifications, dependent: :destroy
  # バリデーション
  validates :user_id, presence: true
  validates :room_id, presence: true
  validates_uniqueness_of :room_id, scope: :user_id

   # トークルームの通知を作成する
   def create_notification_entry!(current_user, other_user_id)
    # すでにトークルーム作成の通知があるかを検索
    notification_entried = Notification.where(["visitor_id = ? AND visited_id = ? AND entry_id = ? AND action = ? ",
                                                current_user.id, other_user_id, id, 'entry'])
    if notification_entried.blank?
      notification = current_user.active_notifications.new(
        visited_id: other_user_id,
        entry_id: id,
        action: 'entry'
      )
      notification.save if notification.valid?
    end
  end
end
