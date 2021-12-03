# frozen_string_literal: true

module Api
  module V1
    class RankingsController < ApplicationController
      before_action :logged_in_user, only: %i[sleeping_hours feeling read_books stack_books]

      def sleeping_hours
        # 睡眠平均時間、上位6人を検索 
        @ranks = Diary.select("user_id, AVG(sleeping_hours) as average_sleeping_hours" )
                        .group("user_id")
                        .order(average_sleeping_hours: :desc)
                        .first(3)
        sleeping_hours_rank = []
        # User情報を付与
        @ranks.each do |rank|
          @user = User.find(rank.user_id)
          sleeping_hours_rank << {user: @user, average: rank.average_sleeping_hours}
        end
        render json: {sleeping_hours_rank: sleeping_hours_rank},
               status: :ok
                      
      end

      def feeling
      end

      def read_books
      end

      def stack_books
      end

      def sleep_debt
      end
    end
  end
end
