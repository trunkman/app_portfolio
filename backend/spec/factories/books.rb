# frozen_string_literal: true

FactoryBot.define do
  factory :book do
    title { 'ブックタイトル' }
    author { '著者' }
    publisherName { '出版社' }
    itemPrice { 1000 }
    sequence(:isbn) { |n| "#{n}123456789012" }
  end

  factory :read_book, class: Book do
    title { '読了本' }
    author { '著者' }
    publisherName { '出版社' }
    itemPrice { 1000 }
    sequence(:isbn) { |n| "#{n}345678901234" }
  end

  factory :stack_book, class: Book do
    title { '積読本' }
    author { '著者' }
    publisherName { '出版社' }
    itemPrice { 1000 }
    sequence(:isbn) { |n| "#{n}456789012345" }
  end

end
