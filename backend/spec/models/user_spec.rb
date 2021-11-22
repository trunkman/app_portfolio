# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:micropost) { FactoryBot.create(:micropost) }
  let(:room) { FactoryBot.create(:room) }
  let(:diary) { FactoryBot.create(:diary) }
  let(:book) { FactoryBot.create(:book) }
  let(:content) {'Lorem ipsum' }

  it 'ユーザーが存在している確認' do
    user.valid?
    expect(user).to be_valid
  end

  it 'nameが空であってはならない' do
    user.name = '  '
    expect(user).not_to be_valid
  end

  it 'nameが長すぎるべきではない' do
    user.name = 'a' * 51
    expect(user).not_to be_valid
  end

  it 'emailが空であってはならない' do
    user.email = '  '
    expect(user).not_to be_valid
  end

  it 'emailが長すぎるべきではない' do
    user.email = "#{'a' * 244}@example.com"
    expect(user).not_to be_valid
  end

  it '正規表現のemailである' do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      user.email = valid_address
      expect(user).to be_valid
    end
  end

  it '正規表現でないemailは弾かれる' do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      user.email = invalid_address
      expect(user).not_to be_valid
    end
  end

  it 'emailは一意性である' do
    dupulicate_user = user.dup
    user.save
    expect(dupulicate_user).not_to be_valid
  end

  it 'emailは小文字で登録される' do
    mixed_case_email = 'Foo@ExAMple.Com'
    user.email = mixed_case_email
    user.save
    expect(mixed_case_email.downcase).to eq user.reload.email
  end

  it 'パスワードは空であってはならない' do
    user.password = user.password_confirmation = '  '
    expect(user).not_to be_valid
  end

  it 'パスワードは6桁以上であるべき' do
    user.password = user.password_confirmation = 'a' * 5
    expect(user).not_to be_valid
  end

  it 'remenberのdigestがないとfalseを返す' do
    expect(user.authenticated?(:remember, '')).to be_falsey
  end

  it 'プロフィールは長すぎてはいけない' do
    user.profile = 'a' * 151
    expect(user).not_to be_valid
  end

  it '理想睡眠時間は空であってはいけない' do
    user.ideal_sleeping_hours = ' '
    expect(user).not_to be_valid
  end

  it '理想睡眠時間は長すぎてはいけない' do
    user.ideal_sleeping_hours = '7.125'
    expect(user).not_to be_valid
  end

  it 'ユーザー削除に紐づいて投稿も削除される' do
    user.microposts.create(content: content)
    expect { user.destroy }.to change { Micropost.count }.by(-1)
  end

  it 'ユーザー削除に紐づいてコメントも削除される' do
    user.comments.create(micropost_id: micropost.id,
                         content: content)
    expect { user.destroy }.to change { Comment.count }.by(-1)
  end

  it 'ユーザー削除に紐づいていいねも削除される' do
    user.likes.create(micropost_id: micropost.id)
    expect { user.destroy }.to change { Like.count }.by(-1)
  end

  it 'ユーザー削除に紐づいてフォローも解除される' do
    user.active_relationships.create(followed_id: other_user.id)
    expect { user.destroy }.to change { Relationship.count }.by(-1)
  end

  it 'ユーザー削除に紐づいてEntry(トークルームとの紐付け)も削除される' do
    user.entries.create(room_id: room.id)
    expect { user.destroy }.to change { Entry.count }.by(-1)
  end

  it 'ユーザー削除に紐づいてメッセージも削除される' do
    user.messages.create(room_id: room.id, content: content)
    expect { user.destroy }.to change { Message.count }.by(-1)
  end

  it 'ユーザー削除に紐づいて日記も削除される' do
    user.diaries.create(date: diary.date,
                        sleeping_hours: diary.sleeping_hours,
                        feeling: diary.feeling)
    expect { user.destroy }.to change { Diary.count }.by(-1)
  end

  it 'ユーザー削除に紐づいてSubscription(読了/積読)も削除される' do
    user.subscriptions.create(book_id: book.id)
    expect { user.destroy }.to change { Subscription.count }.by(-1)
  end
end
