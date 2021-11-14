class Room < ApplicationRecord
  # 関連付け
  has_many :entries
  has_many :messages
  has_many :room_users, through: :entries, source: :user
end
