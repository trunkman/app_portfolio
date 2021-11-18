require 'rails_helper'

RSpec.describe Micropost, type: :model do
  let(:micropost) { FactoryBot.create(:micropost) }
  # let(:user) { FactoryBot.create(:user) }
  # let(:other_user) { FactoryBot.create(:user) }

  it '投稿が存在している確認' do
    micropost.valid?
    expect(micropost).to be_valid
  end

  it 'user_idが空であってはならない' do
    micropost.user_id = '  '
    expect(micropost).not_to be_valid
  end

  it 'contentが空であってはならない' do
    micropost.content = '  '
    expect(micropost).not_to be_valid
  end

  it 'contentが長すぎるべきではない' do
    micropost.content = 'a' * 141
    expect(micropost).not_to be_valid
  end

  it '最新順に投稿が表示されるか' do
    @micropost_yesterday = FactoryBot.create(:micropost_yesterday)
    @micropost_now = FactoryBot.create(:micropost_now)
    expect(@micropost_now).to eq Micropost.first
  end

  it '投稿が削除されると、いいねも削除される' do
    micropost.likes.create(user_id: 1)
    expect { micropost.destroy }.to change { Like.count }.by(-1)
  end

  it '投稿が削除されると、コメントも削除される' do
    micropost.comments.create(user_id: 1, content:'Lorem ipsum')
    expect { micropost.destroy }.to change { Comment.count }.by(-1)
  end

  # it 'いいねしているユーザーを取得する' do
  # end

end
