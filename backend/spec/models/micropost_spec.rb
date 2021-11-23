# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Micropost, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:micropost) { FactoryBot.create(:micropost) }

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

  it '最新順に投稿が表示される' do
    @micropost_yesterday = FactoryBot.create(:micropost_yesterday)
    @micropost_now = FactoryBot.create(:micropost_now)
    expect(@micropost_now).to eq Micropost.first
  end

  it '投稿が削除されると、いいねも削除される' do
    micropost.likes.create(user_id: 1)
    expect { micropost.destroy }.to change { Like.count }.by(-1)
  end

  it '投稿が削除されると、コメントも削除される' do
    micropost.comments.create(user_id: 1, content: 'Lorem ipsum')
    expect { micropost.destroy }.to change { Comment.count }.by(-1)
  end

  it '投稿が削除されると、通知も削除される' do
    user.active_notifications.create(visited_id: 2, micropost_id: micropost.id, action: 'like')
    user.active_notifications.create(visited_id: 2, micropost_id: micropost.id, comment_id: 1, action: 'comment')
    expect { micropost.destroy }.to change { Notification.count }.by(-2)
  end
end
