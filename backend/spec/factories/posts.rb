FactoryBot.define do
  factory :post, class: Post do
    content { "Lorem ipsum" }
    created_at { 10.minutes.ago }
    association :user,
      factory: :alice
  end

  factory :post_now, class: Post do
      content { 'Now' }
      created_at { Time.zone.now }
      association :user,
      factory: :alice
  end

  factory :post_yesterday, class: Post do
    content { 'Yesterday' }
    created_at { 1.days.ago }
    association :user,
    factory: :bob
  end
end
