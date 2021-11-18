# frozen_string_literal: true

class Subscription < ApplicationRecord
  # 関連付け
  belongs_to :user
  belongs_to :book
  # バリデーション
  validates :user_id, presence: true
  validates :book_id, presence: true
  validates_uniqueness_of :book, scope: :user_id
end
