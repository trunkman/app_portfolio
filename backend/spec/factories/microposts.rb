# frozen_string_literal: true

FactoryBot.define do
  factory :micropost do
    sequence(:content) { |n| "#{n} Lorem ipsum" }
    created_at { 10.minutes.ago }
    association :user
  end

  factory :micropost_now, class: Micropost do
    content { 'Now' }
    created_at { Time.zone.now }
    association :user, factory: :user
  end

  factory :micropost_yesterday, class: Micropost do
    content { 'Yesterday' }
    created_at { 1.days.ago }
    association :user, factory: :user
  end

  factory :other_micropost, class: Micropost do
    content { 'other_micropost' }
    created_at { 10.minutes.ago }
    association :user, factory: :admin
  end
end
