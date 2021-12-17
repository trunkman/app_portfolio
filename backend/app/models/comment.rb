# frozen_string_literal: true

class Comment < ApplicationRecord
  # 関連付け
  belongs_to :user
  belongs_to :micropost
  has_many :notifications, dependent: :destroy
  # スコープ
  default_scope -> { order(created_at: :desc) }
  # バリデーション
  validates :user_id, presence: true
  validates :micropost_id, presence: true
  validates :content, presence: true, length: { maximum: 140 }
end
