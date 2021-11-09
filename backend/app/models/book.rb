class Book < ApplicationRecord
  # 関連付け
  has_many :subscriptions, dependent: :destroy
  # バリデーション
  validates :title, presence: true
end
