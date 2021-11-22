# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "#{n}君" }
    sequence(:email) { |n| "test#{n}@example.com" }
    password { 'foobar' }
    password_confirmation { 'foobar' }
    profile { 'ユーザーのプロフィール。自己紹介などを記載する' }
    ideal_sleeping_hours { 7.25 }
    admin { 'false' }
    activated { 'true' }
    activated_at { Time.zone.now }
  end

  factory :admin, class: User do
    name { 'Admin' }
    email { 'admin@example.com' }
    password { 'foobar' }
    password_confirmation { 'foobar' }
    profile { 'ユーザーのプロフィール。自己紹介などを記載する' }
    ideal_sleeping_hours { 7.25 }
    admin { 'true' }
    activated { 'true' }
    activated_at { Time.zone.now }
  end

  factory :non_activated, class: User do
    name { 'Non_activated' }
    email { 'non_activated@example.com' }
    password { 'foobar' }
    password_confirmation { 'foobar' }
    profile { 'ユーザーのプロフィール。自己紹介などを記載する' }
    ideal_sleeping_hours { 7.25 }
    admin { 'true' }
    activated { 'false' }
    activated_at { Time.zone.now }
  end

  # factory :bob, class: User do
  #   name { 'Bob' }
  #   email { 'bob@example.com' }
  #   password { 'foobar' }
  #   password_confirmation { 'foobar' }
  #   activated { 'true' }
  #   activated_at { Time.zone.now }
  # end
end
