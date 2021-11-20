# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RoomsController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }

  it '未ログインユーザーはトークのメッセージ一覧を取得できない' do
    get api_v1_room_path(user)
    expect(response.status).to eq(401)
  end

  it '未ログインユーザーはトークルームを作成できない' do
    post api_v1_room_path, params: { followed_id: user.id }
    expect(response.status).to eq(401)
  end

  # deleteのrouteが違っているみたい
  it '未ログインユーザーはフォロー解除できない' do
    user.active_relationships.create(followed_id: other_user.id)
    delete api_v1_follow_path(other_user)
    expect(response.status).to eq(401)
  end

  it '未ログインユーザーはフォローユーザーidを取得できない' do
    user.active_relationships.create(followed_id: other_user.id)
    get api_v1_follow_path
    expect(response.status).to eq(401)
  end
end
