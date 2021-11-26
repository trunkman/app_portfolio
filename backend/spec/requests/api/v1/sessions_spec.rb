# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::SessionsController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:non_activated_user) { FactoryBot.create(:non_activated) }
  let(:params) { { session: { email: user.email, password: user.password } } }

  it 'ログインする' do
    post api_v1_login_path, params: { session: { email: user.email,
                                                 password: user.password } }
    expect(response.status).to eq(201)
  end

  it 'アカウント有効化していないユーザーはログインできない' do
    non_activated_user
    post api_v1_login_path, params: { session: { email: non_activated_user.email,
                                                 password: non_activated_user.password } }
    expect(response.status).to eq(401)
  end

  it 'ログアウトする' do
    log_in_as(user)
    delete api_v1_logout_path(user)
    expect(response.status).to eq(200)
  end
end
