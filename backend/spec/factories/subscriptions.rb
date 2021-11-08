FactoryBot.define do
  factory :subscription do
    read { false }
    user { nil }
    book { nil }
  end
end
