# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::DiariesController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:diary) { FactoryBot.create(:diary) }
  let(:update_diary) do
    user.diaries.create(date: diary.date, sleeping_hours: diary.sleeping_hours, feeling: diary.feeling)
  end
  let(:delete_diary) do
    user.diaries.create(date: diary.date, sleeping_hours: diary.sleeping_hours, feeling: diary.feeling)
  end

  it '日記を投稿する' do
    log_in_as(user)
    post api_v1_diaries_path, params: { diary: { date: diary.date,
                                                 sleeping_hours: diary.sleeping_hours,
                                                 feeling: diary.feeling } }
    expect(response.status).to eq(201)
  end

  it '未ログインでは日記を投稿できない' do
    post api_v1_diaries_path, params: { diary: { date: diary.date,
                                                 sleeping_hours: diary.sleeping_hours,
                                                 feeling: diary.feeling } }
    expect(response.status).to eq(401)
  end

  it '日記を編集する' do
    log_in_as(user)
    patch api_v1_diary_path(update_diary), params: { diary: { date: '1999/01/01',
                                                              sleeping_hours: 9.0,
                                                              feeling: 'bad' } }
    expect(response.status).to eq(200)
    expect(json['diary']['feeling']).to eq('bad')
  end

  it '未ログインでは日記を編集できない' do
    patch api_v1_diary_path(diary), params: { diary: { date: '1999/01/01',
                                                       sleeping_hours: 9.0,
                                                       feeling: 'bad' } }
    expect(response.status).to eq(401)
  end

  it '他ユーザーは日記を編集できない' do
    log_in_as(other_user)
    patch api_v1_diary_path(diary), params: { diary: { date: '2011/11/01',
                                                       sleeping_hours: 9.0,
                                                       feeling: 'bad' } }
    expect(response.status).to eq(403)
  end

  it '日記を削除する' do
    log_in_as(user)
    delete_diary
    expect { delete api_v1_diary_path(delete_diary) }.to change(Diary, :count).by(-1)
    expect(response.status).to eq(200)
  end

  it '未ログインでは日記を削除できない' do
    delete api_v1_diary_path(delete_diary)
    expect(response.status).to eq(401)
  end

  it '他ユーザーは日記を削除できない' do
    log_in_as(other_user)
    delete api_v1_diary_path(delete_diary)
    expect(response.status).to eq(403)
  end

  it '睡眠時間を計算した結果、睡眠負債を返すケース' do
    debt_diary = user.diaries.create(date: '1999/01/01', sleeping_hours: 5.25, feeling: 'good')
    log_in_as(user)
    get "/api/v1/sleep_debt/#{user.id}"
    total_time = user.ideal_sleeping_hours - debt_diary.sleeping_hours 
    expect(json['sleep_debt']).to eq(total_time.round(2))
    expect(response.status).to eq(200)
  end

  it '睡眠時間を計算した結果、余剰睡眠を返すケース' do
    saving_diary = user.diaries.create(date: '1999/01/01', sleeping_hours: 10, feeling: 'good')
    log_in_as(user)
    get "/api/v1/sleep_debt/#{user.id}"
    total_time = saving_diary.sleeping_hours - user.ideal_sleeping_hours
    expect(json['sleep_saving']).to eq(total_time.round(2))
    expect(response.status).to eq(200)
  end

  it '未ログインでは睡眠時間を計算できない' do
    diaries = user.diaries.create(date: diary.date, sleeping_hours: 10.0, feeling: diary.feeling)
    get "/api/v1/sleep_debt/#{user.id}"
    expect(response.status).to eq(401)
  end

end
