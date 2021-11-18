# frozen_string_literal: true

FactoryBot.define do

  factory :message do
    sequence(:content) { |n| "#{n} Lorem ipsum" }
    created_at { 10.minutes.ago }
    association :user
    association :room
  end

  factory :message_now, class: Message do
    content { 'Now' }
    created_at { Time.zone.now }
    association :user, factory: :alice
    association :room, factory: :room_now
  end

  factory :message_yesterday, class: Message do
    content { 'Yesterday' }
    created_at { 1.days.ago }
    association :user, factory: :bob
    association :room, factory: :room_yesterday
  end

end
