# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:micropost) { FactoryBot.create(:micropost) }
  let(:comment) do
    user.comments.create(micropost_id: micropost.id,
                         content: 'Lorem ipsum')
  end

  it 'コメントが存在している確認' do
    expect(comment).to be_valid
  end

  it 'user_idは空であってはいけない' do
    comment.user_id = nil
    expect(comment).not_to be_valid
  end

  it 'micropost_idは空であってはいけない' do
    comment.micropost_id = nil
    expect(comment).not_to be_valid
  end

  it 'コメントは空であってはいけない' do
    comment.content = nil
    expect(comment).not_to be_valid
  end

  it 'コメントは長すぎてはいけない' do
    comment.content = 'a' * 141
    expect(comment).not_to be_valid
  end

  it 'コメントが削除されると、通知も削除される' do
    user.active_notifications.create(visited_id: 2, micropost_id: micropost.id, comment_id: comment.id,
                                     action: 'comment')
    expect { comment.destroy }.to change { Notification.count }.by(-1)
  end
end
