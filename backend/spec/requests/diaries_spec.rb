# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Diaries', type: :request do
  describe 'GET /show' do
    it 'returns http success' do
      get '/diaries/show'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /create' do
    it 'returns http success' do
      get '/diaries/create'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /update' do
    it 'returns http success' do
      get '/diaries/update'
      expect(response).to have_http_status(:success)
    end
  end
end
