# frozen_string_literal: true

FactoryBot.define do
  factory :room do
    created_at { Time.zone.now }
  end
end
