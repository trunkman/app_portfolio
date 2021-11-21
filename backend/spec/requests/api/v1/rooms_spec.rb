# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RoomsController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:room) { FactoryBot.create(:room) }

  # メッセージがnilクラスになる
  it 'トークのメッセージ一覧を取得する' do
    log_in_as(user)
    user.messages.create(room_id: room.id)
    get "/api/v1/talk_room/#{other_user.id}"
    expect(response.status).to eq(200)
  end

  it '未ログインユーザーはトークのメッセージ一覧を取得できない' do
    user.messages.create(room_id: room.id)
    get "/api/v1/talk_room/#{other_user.id}"
    expect(response.status).to eq(401)
  end

  # User findでidが見つからない
  it 'トークルームを作成する' do
    log_in_as(user)
    post api_v1_rooms_path, params: { room: { user_id: other_user.id } }
    expect(json['room_id']).to be_falsey
    expect(response.status).to eq(200)
  end

  # User findでidが見つからない
  it 'すでにトークルームを作成していた場合、is_room: trueを返す' do
    log_in_as(user)
    # userとoher_userのトークルームを作成
    @room = Room.create!
    Entry.create(user_id: user.id, room_id: @room.id)
    Entry.create(user_id: other_user.id, room_id: @room.id)
    post api_v1_rooms_path, params: { room: { user_id: other_user.id } }
    expect(json['room_id']).to be_truthy
    expect(response.status).to eq(200)
  end

  it '未ログインユーザーはトークルームを作成できない' do
    post api_v1_rooms_path, params: { user_id: other_user.id }
    expect(response.status).to eq(401)
  end

  it 'トークルームを削除する' do
    log_in_as(user)
    delete api_v1_room_path(room)
    expect(response.status).to eq(200)
  end

  it '未ログインユーザーはトークルームを削除できない' do
    delete api_v1_room_path(room)
    expect(response.status).to eq(401)
  end
end
