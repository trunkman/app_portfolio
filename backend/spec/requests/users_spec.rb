require 'rails_helper'

RSpec.describe 'Users', type: :request do
  describe '#new' do
    it '登録画面の表示に成功' do
      get api_v1_signup_path
      expect(response).to have_http_status(:success)
    end
  end
end
