require 'rails_helper'

RSpec.describe 'StaticPages', type: :request do
  describe 'Homeページの表示' do
    it 'returns http success' do
      get '/api/v1/'
      expect(response).to have_http_status(:success)
    end
  end
end
