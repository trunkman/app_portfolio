# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::MessagesController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:room) { FactoryBot.create(:room) }

  it 'チャットでメッセージを送る' do
    log_in_as(user)
    post api_v1_messages_path, params: { message: { room_id: room.id,
                                                    content: 'Lorem ipsum' } }
    expect(response.status).to eq(200)
  end

  it '未ログインユーザーはメッセージを送れない' do
    post api_v1_messages_path, params: { message: { room_id: room.id,
                                                    content: 'Lorem ipsum' } }
    expect(response.status).to eq(401)
  end
end
