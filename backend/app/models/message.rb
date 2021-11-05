class Message < ApplicationRecord
  # 関連付け
  belongs_to :user
  belongs_to :room
  # スコープ
  default_scope -> { order(created_at: :desc) }
  # バリデーション
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 140 }
end
