# frozen_string_literal: true

FactoryBot.define do
  factory :diary do
    sleeping_hours { 7.5 }
    feeling { 'good' }
    date { '2021/11/01' }
    association :user
  end

  factory :bad, class: Diary do
    sleeping_hours { 5.0 }
    feeling { 'bad' }
    date { '2021/11/02' }
    association :user
  end

  factory :normal, class: Diary do
    sleeping_hours { 6.5 }
    feeling { 'normal' }
    date { '2021/11/03' }
    association :user
  end
end
