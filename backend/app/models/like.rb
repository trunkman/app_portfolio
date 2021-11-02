class Like < ApplicationRecord
  # 関連付け
  belongs_to :user
  belongs_to :micropost
  # バリデーション
  validates :user_id, presence: true
  validates :micropost_id, presence: true
end
