# frozen_string_literal: true

class Notification < ApplicationRecord
  # 関連付け
  belongs_to :visitor, class_name: 'User'
  belongs_to :visited, class_name: 'User'
  belongs_to :micropost, optional: true
  belongs_to :comment, optional: true
  belongs_to :entry, optional: true
  belongs_to :message, optional: true
  # スコープ
  default_scope -> { order(created_at: :desc) }
  # バリデーション
  validates :visitor_id, presence: true
  validates :visited_id, presence: true
  validates :action, presence: true
end
