# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RoomsController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:room) { FactoryBot.create(:room) }
  let(:user_entry) { user.entries.create(room_id: room.id) }
  let(:other_user_entry) { other_user.entries.create(room_id: room.id) }
  let(:user_message) { user.messages.create(room_id: room.id) }
  let(:other_user_message) { other_user.messages.create(room_id: room.id) }

  # ここのテストがまだクリアできない
  it 'トークのメッセージ一覧を取得する' do
    user_entry
    other_user_entry
    user.messages
    other_user.messages
    log_in_as(user)
    get "/api/v1/rooms/#{other_user.id}"
    expect(response.status).to eq(200)
  end

  it '未ログインユーザーはトークのメッセージ一覧を取得できない' do
    user.messages
    other_user.messages
    get "/api/v1/rooms/#{other_user.id}"
    expect(response.status).to eq(401)
  end

  it 'トークルームを作成する' do
    log_in_as(user)
    expect do
      post api_v1_rooms_path,
           params: { room: { user_id: other_user.id } }
    end.to change(Room, :count).by(+1)
    expect(json['is_room']).to be_falsey
    expect(response.status).to eq(200)
  end

  it 'すでにトークルームを作成していた場合、is_room: trueを返す' do
    user_entry
    other_user_entry
    log_in_as(user)
    post api_v1_rooms_path, params: { room: { user_id: other_user.id } }
    expect(json['is_room']).to be_truthy
    expect(response.status).to eq(200)
  end

  it '未ログインユーザーはトークルームを作成できない' do
    post api_v1_rooms_path, params: { user_id: other_user.id }
    expect(response.status).to eq(401)
  end

  it 'トークルームを削除する' do
    room
    log_in_as(user)
    expect { delete api_v1_room_path(room) }.to change(Room, :count).by(-1)
    expect(response.status).to eq(200)
  end

  it '未ログインユーザーはトークルームを削除できない' do
    room
    delete api_v1_room_path(room)
    expect(response.status).to eq(401)
  end
end
