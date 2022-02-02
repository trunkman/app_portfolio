# frozen_string_literal: true

class Subscription < ApplicationRecord
  # 関連付け
  belongs_to :user
  belongs_to :book
  # バリデーション
  validates :user_id, presence: true
  validates :book_id, presence: true
  validates_uniqueness_of :book_id, scope: :user_id

  # ユーザー読了数を算出し、上位順に返す
  def self.user_reading_rank(count)
    where(read: true)
    .select('user_id, COUNT(user_id) as count_users')
    .group('user_id')
    .order(count_users: :desc)
    .first(count)
  end
  
  # 読了本の人気を算出し、上位順に返す
  def self.read_book_rank(count)
    where(read: true)
    .select('book_id, COUNT(book_id) as count_books')
    .group('book_id')
    .order(count_books: :desc)
    .first(count)
  end

  # 積読本の人気を算出し、上位順に返す
  def self.stack_book_rank(count)
    where(read: false)
    .select('book_id, COUNT(book_id) as count_books')
    .group('book_id')
    .order(count_books: :desc)
    .first(count)
  end

end
