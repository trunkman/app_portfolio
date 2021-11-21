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

  it '未ログインユーザーは日記を投稿できない' do
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

  it '未ログインユーザーは日記を編集できない' do
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

  it '未ログインユーザーは日記を削除できない' do
    delete api_v1_diary_path(delete_diary)
    expect(response.status).to eq(401)
  end

  it '他ユーザーは日記を削除できない' do
    log_in_as(other_user)
    delete api_v1_diary_path(delete_diary)
    expect(response.status).to eq(403)
  end
end
