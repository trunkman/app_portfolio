# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::MessagesController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:room) { FactoryBot.create(:room) }
  let(:message) { user.messages.create({ room_id: room.id, content: 'Lorem ipsum' })}
  let(:params) { { message: { room_id: room.id, content: 'Lorem ipsum' } } }

  it 'チャットでメッセージを送る' do
    room  # トークルームを作戦
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

  it 'メッセージを削除する' do
    message  # メッセージを作成
    log_in_as(user)
    expect { delete api_v1_message_path(message) }.to change(Message, :count).by(-1)
    expect(response.status).to eq(200)
  end

  it '未ログインではメッセージを削除できない' do
    message
    delete api_v1_message_path(message)
    expect(response.status).to eq(401)  
  end
  
  it '他ユーザーはメッセージを削除できない' do
    message
    log_in_as(other_user)
    delete api_v1_message_path(message)
    expect(response.status).to eq(403)
  end

end
