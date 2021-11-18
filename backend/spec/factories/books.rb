# frozen_string_literal: true

FactoryBot.define do

  factory :book do
    title {'ブックタイトル'}
    author {'著者'}
    publisherName {'出版社'}
    itemPrice {1000}
    sequence(:isbn) { "1234567890123" }
  end  

end
