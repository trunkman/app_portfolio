# frozen_string_literal: true

class Diary < ApplicationRecord
  # 関連付け
  belongs_to :user
  # バリデーション
  validates :user_id, presence: true
  validates :date, presence: true
  validates :feeling, presence: true
end
