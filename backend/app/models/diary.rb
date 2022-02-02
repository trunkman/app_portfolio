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

  # ユーザー平均睡眠時間を算出し、上位順に返す
  def self.user_rank_average(count)
    select('user_id, AVG(sleeping_hours) as average')
    .group('user_id')
    .order(average: :desc)
    .first(count)
  end

end
