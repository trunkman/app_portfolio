# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::LikesController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:micropost) { FactoryBot.create(:micropost) }
  let(:like) { user.likes.create(micropost_id: micropost.id) }
  let(:params) { { like: { user_id: user.id, micropost_id: micropost.id } } }

  it '投稿にいいねする' do
    log_in_as(user)
    expect { post api_v1_likes_path, params: params }.to change(Like, :count).by(+1)
    expect(Notification.count).to eq(1)
    expect(response.status).to eq(201)
  end

  it '未ログインユーザーはいいねできない' do
    post api_v1_likes_path, params: params
    expect(response.status).to eq(401)
  end

  it 'いいねを削除する' do
    like
    log_in_as(user)
    expect { post api_v1_unlikes_path, params: params }.to change(Like, :count).by(-1)
    expect(response.status).to eq(200)
  end

  it '未ログインユーザーはいいねを削除できない' do
    like
    post api_v1_unlikes_path, params: params
    expect(response.status).to eq(401)
  end
end
