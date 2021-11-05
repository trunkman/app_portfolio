class Room < ApplicationRecord
  # 関連付け
  has_many :entry 
  has_many :message
end
