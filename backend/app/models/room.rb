# frozen_string_literal: true

class Room < ApplicationRecord
  # 関連付け
  has_many :entries, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :room_users, through: :entries, source: :user
end
