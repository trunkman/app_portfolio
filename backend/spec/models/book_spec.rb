# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Book, type: :model do
  let(:book) { FactoryBot.create(:book) }

  it '本が存在している確認' do
    book.valid?
    expect(book).to be_valid
  end

  it 'タイトルが空であってはならない' do
    book.title = '  '
    expect(book).not_to be_valid
  end

  it '著者が空であってはならない' do
    book.author = '  '
    expect(book).not_to be_valid
  end

  it '出版社が空であってはならない' do
    book.publisherName = '  '
    expect(book).not_to be_valid
  end

  it '価格が空であってはならない' do
    book.itemPrice = '  '
    expect(book).not_to be_valid
  end

  it 'ISBNが空であってはならない' do
    book.isbn = '  '
    expect(book).not_to be_valid
  end

  it 'ISBNは13桁より多くてはならない' do
    book.isbn = '1' * 14
    expect(book).not_to be_valid
  end

  it 'ISBNは13桁より短くてはならない' do
    book.isbn = '1' * 12
    expect(book).not_to be_valid
  end

  it 'ISBNは一意性である' do
    dupulicate_book = book.dup
    book.save
    expect(dupulicate_book).not_to be_valid
  end
end
