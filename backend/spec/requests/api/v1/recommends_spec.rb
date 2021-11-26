# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RecommendsController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:book) { FactoryBot.create(:book) }
  let(:params) { { recommend: { book_id: book.id } } }
  let(:recommend) { user.create_recommend(book_id: book.id) }

  it 'おすすめの本に登録する' do
    log_in_as(user)
    expect { post api_v1_recommends_path, params: params }.to change(Recommend, :count).by(1)
    expect(response.status).to eq(201)
  end

  it '未ログインではおすすめ本の登録はできない' do
    post api_v1_recommends_path, params: params
    expect(response.status).to eq(401)
  end

  it 'おすすめ本を削除する' do
    recommend
    log_in_as(user)
    expect { delete "/api/v1/recommends/#{book.id}" }.to change(Recommend, :count).by(-1)
    expect(response.status).to eq(200)
  end

  it '未ログインではおすすめ本を削除できない' do
    recommend
    delete "/api/v1/recommends/#{book.id}"
    expect(response.status).to eq(401)
  end
end
