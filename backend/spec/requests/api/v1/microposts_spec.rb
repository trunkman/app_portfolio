# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'microposts_api', type: :request do
  let(:micropost) { FactoryBot.create(:micropost) }
  let(:other_micropost) { FactoryBot.create(:other_micropost) }
  let(:user)       { FactoryBot.create(:user) }

  it '未ログインユーザーは投稿できない' do
    post api_v1_microposts_path, params: { micropost: { content: 'Lorem ipsum' } }
    expect(response.status).to eq(401)
  end

  it '未ログインユーザーは投稿を削除できない' do
    delete api_v1_micropost_path(micropost)
    expect(response.status).to eq(401)
  end

  it '他ユーザーのマイクロポストは削除できない' do
    log_in_as(user)
    delete api_v1_micropost_path(other_micropost)
    expect(response.status).to eq(403)
  end

end
