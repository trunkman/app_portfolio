# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Diary, type: :model do
  let(:diary) { FactoryBot.create(:diary) }

  it '日記が存在している確認' do
    expect(diary).to be_valid
  end

  it 'user_idは空であってはいけない' do
    diary.user_id = nil
    expect(diary).not_to be_valid
  end

  it '日付は空であってはいけない' do
    diary.date = nil
    expect(diary).not_to be_valid
  end

  it '日付は長すぎてはならない' do
    diary.date = 'yyyy/MM/ddd'
    expect(diary).not_to be_valid
  end

  it '日付は短すぎてはならない' do
    diary.date = 'yyyy/MM/d'
    expect(diary).not_to be_valid
  end

  # it '日付は数字のみで入力する' do
  #   invalid_sets = ["aaaa/bb/cc", "ああああ/../11"]
  #   invalid_sets.each do |invalid_date|
  #     diary.date = invalid_date
  #     expect(diary).not_to be_valid
  #   end
  # end

  it '睡眠時間は空であってはいけない' do
    diary.sleeping_hours = nil
    expect(diary).not_to be_valid
  end

  it '感情記録は空であってはいけない' do
    diary.feeling = nil
    expect(diary).not_to be_valid
  end

  it 'user_idとdateの組み合わせは一意である' do
    dupulicate_diary = diary.dup
    diary.save
    expect(dupulicate_diary).not_to be_valid
  end
end
