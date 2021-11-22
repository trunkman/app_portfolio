# frozen_string_literal: true

class Message < ApplicationRecord
  # 関連付け
  belongs_to :user
  belongs_to :room
  has_many :notifications, dependent: :destroy
  # スコープ
  default_scope -> { order(created_at: :desc) }
  # バリデーション
  validates :user_id, presence: true
  validates :room_id, presence: true
  validates :content, presence: true, length: { maximum: 250 }


  # メッセージの通知を作成する
  def create_notification_entry!(current_user, other_user_id)
    notification = current_user.active_notifications.new(
      visited_id: other_user_id,
      message_id: id,
      action: 'message'
    )
    notification.save if notification.valid?
  end
end
