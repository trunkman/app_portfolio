# frozen_string_literal: true

FactoryBot.define do
  factory :book do
    title { 'ブックタイトル' }
    author { '著者' }
    publisherName { '出版社' }
    itemPrice { 1000 }
    isbn { '0123456789012' }
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

  factory :one_book, class: Book do
    title { 'ブックタイトル' }
    author { '著者' }
    publisherName { '出版社' }
    itemPrice { 1000 }
    # 9人以上はisbnの桁がずれるため使用不可
    sequence(:isbn) { |n| "#{n}234567890123" }
  end

  factory :another_book, class: Book do
    title { 'ブックタイトル' }
    author { '著者' }
    publisherName { '出版社' }
    itemPrice { 1000 }
    # 9人以上はisbnの桁がずれるため使用不可
    sequence(:isbn) { |n| "#{n}567890123456" }
  end

  factory :other_book, class: Book do
    title { 'ブックタイトル' }
    author { '著者' }
    publisherName { '出版社' }
    itemPrice { 1000 }
    # 9人以上はisbnの桁がずれるため使用不可
    sequence(:isbn) { |n| "#{n}678901234567" }
  end
end
