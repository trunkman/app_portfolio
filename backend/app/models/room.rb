class Room < ApplicationRecord
  # 関連付け
  has_many :entries
  has_many :messages
end
