class Book < ApplicationRecord
  # バリデーション
  validates :title, presence: true
end
