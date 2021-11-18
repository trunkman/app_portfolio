class Micropost < ApplicationRecord
  # 関連付け
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :liked_user, through: :likes, source: :user
  has_many_attached :image
  # スコープ
  default_scope -> { order(created_at: :desc) }
  # バリデーション
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 140 }
  validates :image, content_type: { in: %w[image/jpeg image/gif image/png],
                                    message: '正しい画像形式でお願いします' },
                    size: { less_than: 5.megabytes,
                            message: '5MB以下でお願いします' }
end
