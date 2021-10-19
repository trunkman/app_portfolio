require 'rails_helper'

RSpec.describe 'users_api', type: :request do
  let(:user)       { FactoryBot.create(:alice) }
  let(:other_user) { FactoryBot.create(:bob) }

  describe 'Userアクション' do
    it 'ユーザーページを取得する' do
      get api_v1_user_path(user)
      expect(response.status).to eq(200)
      expect(json['user']['email']).to eq(user.email)
    end

    it '未ログインのユーザーはindexを取得できない' do
      get api_v1_users_path
      expect(response.status).to eq(401)
    end

    it '新規ユーザーを登録する' do
      post api_v1_signup_path, params: { user: { name: '正しいユーザー',
                                                 email: 'correct@examle.com',
                                                 password: 'foobar',
                                                 password_confirmation: 'foobar' } }
      expect(response.status).to eq(201)
    end

    it '新規ユーザーが保存できなかった時はエラーを返す' do
      post api_v1_signup_path, params: { user: { name: '誤ったユーザー',
                                                 email: 'wrong@@example,com',
                                                 password: 'foobar',
                                                 password_confirmation: 'password' } }
      expect(response.status).to eq(422)
    end

    it 'ユーザーを更新する' do
      log_in_as(user)
      patch api_v1_user_path(user), params: { user: { name: 'ログインユーザー',
                                                      email: 'login@example.com' } }
      expect(response.status).to eq(200)
    end

    it '未ログインのユーザーは更新できない' do
      patch api_v1_user_path(user), params: { user: { name: '未ログインユーザー',
                                                      email: 'not_login@example.com' } }
      expect(response.status).to eq(401)
    end

    it '他ユーザーの更新はできない' do
      log_in_as(other_user)
      patch api_v1_user_path(user), params: { user: { name: '別のユーザー',
                                                      email: 'not_login@example.com' } }
      expect(response.status).to eq(401)
    end

    it '未ログインは削除できない' do
      delete api_v1_user_path(user)
      expect(response.status).to eq(401)
    end

    it '非管理者は削除できない' do
      log_in_as(other_user)
      delete api_v1_user_path(other_user)
      expect(response.status).to eq(401)
    end
  end
end
