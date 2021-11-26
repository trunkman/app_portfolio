# frozen_string_literal: true

class Recommend < ApplicationRecord
  # 関連付け
  belongs_to :user
  belongs_to :book
  # バリデーション
  validates :user_id, presence: true, uniqueness: true
  validates :book_id, presence: true
end
