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
end
