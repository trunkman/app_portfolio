# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "#{n}君" }
    sequence(:email) { |n| "test#{n}@example.com" }
    password { 'foobar' }
    password_confirmation { 'foobar' }
    admin { 'true' }
    activated { 'true' }
    activated_at { Time.zone.now }
  end

  factory :alice, class: User do
    id { '1' }
    name { 'Alice' }
    email { 'alice@example.com' }
    password { 'foobar' }
    password_confirmation { 'foobar' }
    admin { 'true' }
    activated { 'true' }
    activated_at { Time.zone.now }
  end

  factory :bob, class: User do
    id { '2' }
    name { 'Bob' }
    email { 'bob@example.com' }
    password { 'foobar' }
    password_confirmation { 'foobar' }
    activated { 'true' }
    activated_at { Time.zone.now }
  end
end
