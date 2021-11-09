FactoryBot.define do
  factory :diary do
    user { nil }
    sleeping_hours { 1 }
    feeling { "MyString" }
    start_time { "2021-11-09 05:11:29" }
  end
end
