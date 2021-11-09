class Diary < ApplicationRecord
  # 関連付け
  belongs_to :user
  # バリデーション
  validates :user_id,    presence: true
  validates :start_time, presence: true
end
