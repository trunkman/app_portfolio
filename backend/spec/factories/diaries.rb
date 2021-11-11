FactoryBot.define do
  factory :diary do
    user { nil }
    sleeping_hours { 1 }
    feeling { "MyString" }
    date { "MyString" }
  end
end
