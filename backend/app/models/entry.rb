# frozen_string_literal: true

class Entry < ApplicationRecord
  # 関連付け
  belongs_to :user
  belongs_to :room
  # バリデーション
  validates :user_id, presence: true
  validates :room_id, presence: true
  validates_uniqueness_of :room_id, scope: :user_id
end
