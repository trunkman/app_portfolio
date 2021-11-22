# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Room, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:room) { FactoryBot.create(:room) }

  it 'トークルームが存在している確認' do
    expect(room).to be_valid
  end

  it 'ユーザー削除に紐づいてEntry(トークルームとの紐付け)も削除される' do
    room.entries.create(user_id: user.id)
    expect { room.destroy }.to change { Entry.count }.by(-1)
  end

  it 'トークルーム削除に紐づいてメッセージも削除される' do
    room.messages.create(user_id: user.id, content: 'Lorem ipsum')
    expect { room.destroy }.to change { Message.count }.by(-1)
  end

end
