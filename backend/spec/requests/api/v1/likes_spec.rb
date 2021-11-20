# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::LikesController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:micropost) { FactoryBot.create(:micropost) }

  it '未ログインユーザーはいいねできない' do
    post api_v1_likes_path, params: { like: { user_id: user.id, micropost_id: micropost.id } }
    expect(response.status).to eq(401)
  end

  it '未ログインユーザーはいいねを削除できない' do
    post api_v1_unlikes_path, params: { like: { user_id: user.id,
                                                micropost_id: micropost.id } }
    expect(response.status).to eq(401)
  end

  it '他ユーザーのいいねは削除できない' do
    log_in_as(user)
    other_like = other_user.likes.create(micropost_id: micropost.id)
    post api_v1_unlikes_path, params: { like: { user_id: user.id,
                                                micropost_id: micropost.id } }
    expect(response.status).to eq(403)
  end
end
