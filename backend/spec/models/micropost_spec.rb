require 'rails_helper'

RSpec.describe Micropost, type: :model do
  let(:micropost) { FactoryBot.create(:micropost) }

  it '投稿が存在している確認' do
    micropost.valid?
    expect(micropost).to be_valid
  end

  describe 'user_idのテスト' do
    it 'user_idが空であってはならない' do
      micropost.user_id = '  '
      expect(micropost).not_to be_valid
    end
  end

  describe 'contentのテスト' do
    it 'contentが空であってはならない' do
      micropost.content = '  '
      expect(micropost).not_to be_valid
    end

    it 'contentが長すぎるべきではない' do
      micropost.content = 'a' * 141
      expect(micropost).not_to be_valid
    end
  end

  describe '投稿順序のテスト' do
    let!(:micropost_yesterday) { FactoryBot.create(:micropost_yesterday) }
    let!(:micropost_now) { FactoryBot.create(:micropost_now) }

    it '最新順に投稿が表示されるか' do
      expect(micropost_now).to eq Micropost.first
    end
  end
end
