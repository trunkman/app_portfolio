FactoryBot.define do
  factory :alice, class: User do
    id { "1" }
    name { "alice" }
    email { "alice@example.com" }
    password { "foobar" }
    password_confirmation { "foobar" }
    admin { "true" }
    activated { "true" }
    activated_at { Time.zone.now }
  end
end
