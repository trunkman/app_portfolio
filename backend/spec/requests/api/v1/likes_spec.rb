# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::LikesController', type: :request do
    let(:micropost) { FactoryBot.create(:micropost) }
    let(:other_micropost) { FactoryBot.create(:other_micropost) }
    let(:user)       { FactoryBot.create(:user) }
  
    it '未ログインユーザーはいいねできない' do
      post api_v1_likes_path, params: { like: { user_id: user.id, micropost_id: micropost.id } }
      expect(response.status).to eq(401)
    end
  
    it '未ログインユーザーはいいねを削除できない' do
      post api_v1_unlikes_path, params: { like: { micropost_id: micropost.id } }
      expect(response.status).to eq(401)
    end
  
end
