require 'rails_helper'

RSpec.describe 'users_api', type: :request do

  let(:user) do
    FactoryBot.create(:alice)
  end

  describe 'ユーザーページ' do
    it 'ユーザーページを取得する' do
      get api_v1_user_path(user)
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json['user']['email']).to eq(user.email)
    end
  end
end
