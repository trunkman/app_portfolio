# frozen_string_literal: true

class Diary < ApplicationRecord
  # 関連付け
  belongs_to :user
  # バリデーション
  validates :user_id, presence: true
  validates :date, presence: true,
                   length: { maximum: 10, minimum: 10 }
  validates :sleeping_hours, presence: true
  validates :feeling, presence: true
  validates_uniqueness_of :date, scope: :user_id
end
