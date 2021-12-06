# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::MessagesController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:room) { FactoryBot.create(:room) }
  let(:params) { { message: { room_id: room.id, content: 'Lorem ipsum' } } }

  # 要調整（インスタンスは作成できているがNotificationのカウントが0になる）
  it 'チャットでメッセージを送る' do
    # トークルームを作成
    room
    user.entries.create(room_id: room.id)
    other_user.entries.create(room_id: room.id)
    log_in_as(user)
    expect { post api_v1_messages_path, params: params }.to change(Message, :count).by(1)
    expect(Notification.count).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインユーザーはメッセージを送れない' do
    post api_v1_messages_path, params: params
    expect(response.status).to eq(401)
  end
end
