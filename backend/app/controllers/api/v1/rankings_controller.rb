# frozen_string_literal: true

module Api
  module V1
    class RankingsController < ApplicationController
      before_action :logged_in_user, only: %i[sleeping_hours reading read_books stack_books]

      def sleeping_hours
        # 睡眠平均時間の上位6人を検索
        @ranks = Diary.select('user_id, AVG(sleeping_hours) as average')
                      .group('user_id')
                      .order(average: :desc)
                      .first(6)
        sleeping_hours_rank = []
        # User情報を付与
        @ranks.each_with_index do |rank, i|
          @user = User.find(rank.user_id)
          sleeping_hours_rank << { average: rank.average.round(2),
                                   rank: i + 1,
                                   user: @user }
        end
        render json: { sleeping_hours_rank: sleeping_hours_rank },
               status: :ok
      end

      def reading
        # 読了数の上位6人を返す
        @ranks = Subscription.where(read: true)
                             .select('user_id, COUNT(user_id) as count_users')
                             .group('user_id')
                             .order(count_users: :desc)
                             .first(6)
        reading_rank = []
        # User情報を付与
        @ranks.each_with_index do |rank, i|
          @user = User.find(rank.user_id)
          reading_rank << {
            count: rank.count_users,
            rank: i + 1,
            user: @user
          }
        end
        render json: { reading_rank: reading_rank },
               status: :ok
      end

      def read_books
        # 読了本で人気6冊を検索
        @ranks = Subscription.where(read: true)
                             .select('book_id, COUNT(book_id) as count_books')
                             .group('book_id')
                             .order(count_books: :desc)
                             .first(6)
        read_books_rank = []
        # Book情報を付与
        @ranks.each_with_index do |rank, i|
          @book = Book.find(rank.book_id)
          read_books_rank << {
            count: rank.count_books,
            rank: i + 1,
            book: @book
          }
        end
        render json: { read_books_rank: read_books_rank },
               status: :ok
      end

      def stack_books
        # 積読本で人気6冊を検索
        @ranks = Subscription.where(read: false)
                             .select('book_id, COUNT(book_id) as count_books')
                             .group('book_id')
                             .order(count_books: :desc)
                             .first(6)
        stack_books_rank = []
        # Book情報を付与
        @ranks.each_with_index do |rank, i|
          @book = Book.find(rank.book_id)
          stack_books_rank << {
            count: rank.count_books,
            rank: i + 1,
            book: @book
          }
        end
        render json: { stack_books_rank: stack_books_rank },
               status: :ok
      end

      def sleep_debt; end
    end
  end
end
