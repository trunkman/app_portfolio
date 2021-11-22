# frozen_string_literal: true

class Comment < ApplicationRecord
  # 関連付け
  belongs_to :user
  belongs_to :micropost
  has_many_attached :image
  has_many :notifications, dependent: :destroy
  # スコープ
  default_scope -> { order(created_at: :desc) }
  # バリデーション
  validates :user_id, presence: true
  validates :micropost_id, presence: true
  validates :content, presence: true, length: { maximum: 140 }
  validates :image, content_type: { in: %w[image/jpeg image/gif image/png],
                                    message: '正しい画像形式でお願いします' },
                    size: { less_than: 5.megabytes,
                            message: '5MB以下でお願いします' }

  # コメントの通知を作成
  def create_notification_comment!(current_user, comment_id)
    notification = current_user.active_notifications.new(
      visited_id: user_id,
      micropost_id: id,
      comment_id: comment_id,
      action: 'comment'
    )
    # 自分の投稿に対するコメントの場合は、通知済みとする
    if notification.visitor_id == notification.visited_id
      notification.checked = true
    end
    notification.save if notification.valid?
  end
end
