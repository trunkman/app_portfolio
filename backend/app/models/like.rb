class Like < ApplicationRecord
  # 関連付け
  belongs_to :user
  belongs_to :micropost
  # バリデーション
  validates :user_id, presence: true
  validates :micropost_id, presence: true
  validates_uniqueness_of :micropost_id, scope: :user_id
end
