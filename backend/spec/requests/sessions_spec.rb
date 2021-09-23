require 'rails_helper'

RSpec.describe 'Sessions', type: :request do
  describe '#new' do
    it 'ログイン画面の表示に成功すること' do
      get api_v1_login_path
      expect(response).to have_http_status(:success)
    end
  end
end
