# frozen_string_literal: true

FactoryBot.define do
  
  factory :room, class: Room do
    created_at { 10.minutes.ago }
  end

  factory :room_now, class: Room do
    created_at { Time.zone.now }
  end
  
  factory :room_yesterday, class: Room do
    created_at { 1.days.ago }
  end

end
