# frozen_string_literal: true

class Book < ApplicationRecord
  # 関連付け
  has_many :subscriptions
  has_many :recommends
  # バリデーション
  validates :title, presence: true
  validates :isbn, presence: true,
                   length: { minimum: 13 },
                   uniqueness: true
end
