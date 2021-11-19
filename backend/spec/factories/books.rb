# frozen_string_literal: true

FactoryBot.define do
  factory :book do
    title { 'ブックタイトル' }
    author { '著者' }
    publisherName { '出版社' }
    itemPrice { 1000 }
    sequence(:isbn) { '1234567890123' }
  end

  factory :read_book, class: Book do
    title { '読了本' }
    author { '著者' }
    publisherName { '出版社' }
    itemPrice { 1000 }
    sequence(:isbn) { '2345678901234' }
  end

  factory :stack_book, class: Book do
    title { '積読本' }
    author { '著者' }
    publisherName { '出版社' }
    itemPrice { 1000 }
    sequence(:isbn) { '3456789012345' }
  end
end
