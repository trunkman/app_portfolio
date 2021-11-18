# frozen_string_literal: true

FactoryBot.define do
  factory :subscription do
    read { false }
    user { nil }
    book { nil }
  end
end
