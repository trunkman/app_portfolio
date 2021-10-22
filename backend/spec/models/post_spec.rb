require 'rails_helper'

RSpec.describe Post, type: :model do
 let(:post) { FactoryBot.create(:post) }

  it '投稿が存在している確認' do
    post.valid?
    expect(post).to be_valid
  end

  describe 'user_idのテスト' do
    it 'user_idが空であってはならない' do
      post.user_id = '  '
      expect(post).not_to be_valid
    end
  end

  describe 'contentのテスト' do
    it 'contentが空であってはならない' do
      post.content = '  '
      expect(post).not_to be_valid
    end

    it 'contentが長すぎるべきではない' do
      post.content = 'a' * 141
      expect(post).not_to be_valid
    end
  end

  describe '投稿順序のテスト' do
    let!(:post_yesterday) { FactoryBot.create(:post_yesterday) }
    let!(:post_now) { FactoryBot.create(:post_now) }

    it '最新順に投稿が表示されるか' do
      expect(post_now).to eq Post.first
    end
  end

end
