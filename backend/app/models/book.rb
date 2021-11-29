# frozen_string_literal: true

class Book < ApplicationRecord
  # 関連付け
  has_many :subscriptions
  has_many :recommends
  # バリデーション
  validates :title, presence: true
  validates :isbn, presence: true,
                   length: { maximum: 13, minimum: 13 },
                   uniqueness: true
end
