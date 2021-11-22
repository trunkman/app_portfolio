# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RelationshipsController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }

  it 'フォローする' do
    log_in_as(user)
    expect { post api_v1_follow_path, params: { followed_id: other_user.id } }.to change(Relationship, :count).by(1)
    expect(response.status).to eq(201)
  end

  it '未ログインではフォローできない' do
    post api_v1_follow_path, params: { followed_id: other_user.id }
    expect(response.status).to eq(401)
  end

  it 'フォローを解除する' do
    user.active_relationships.create(followed_id: other_user.id)
    log_in_as(user)
    expect { delete "/api/v1/unfollow/#{other_user.id}" }.to change(Relationship, :count).by(-1)
    expect(response.status).to eq(200)
  end

  it '未ログインではフォロー解除できない' do
    user.active_relationships.create(followed_id: other_user.id)
    delete "/api/v1/unfollow/#{other_user.id}"
    expect(response.status).to eq(401)
  end

end
