# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::MicropostsController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:micropost) { user.microposts.create({ content: 'Lorem ipsum' }) }
  let(:params) { { micropost: { content: 'Lorem ipsum' } } }

  it '投稿内容（コメント付き）を返す' do
    # 投稿、いいね、コメントを作成
    micropost
    user.likes.create(micropost_id: micropost.id)
    user.comments.create(content: 'Lorem ipsum', micropost_id: micropost.id)
    log_in_as(user)
    get api_v1_micropost_path(micropost)
    expect(json['micropost'].length).to eq(1)
    expect(json['likeStatus']).to be_truthy
    expect(json['comments'].length).to eq(1)
    expect(response.status).to eq(201)
  end

  it '未ログインでは投稿内容を返せない' do
    get api_v1_micropost_path(micropost)
    expect(response.status).to eq(401)
  end

    it '投稿する' do
    log_in_as(user)
    expect { post api_v1_microposts_path, params: params }.to change(Micropost, :count).by(+1)
    expect(response.status).to eq(201)
  end

  it '未ログインでは投稿できない' do
    post api_v1_microposts_path, params: params
    expect(response.status).to eq(401)
  end

  it '投稿を削除できる' do
    micropost
    log_in_as(user)
    expect { delete api_v1_micropost_path(micropost) }.to change(Micropost, :count).by(-1)
    expect(response.status).to eq(200)
  end

  it '未ログインでは投稿を削除できない' do
    micropost
    delete api_v1_micropost_path(micropost)
    expect(response.status).to eq(401)
  end

  it '他ユーザーのマイクロポストは削除できない' do
    micropost
    log_in_as(other_user)
    delete api_v1_micropost_path(micropost)
    expect(response.status).to eq(403)
  end
end
