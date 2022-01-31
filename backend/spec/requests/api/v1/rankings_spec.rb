# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RankingController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:second_user) { FactoryBot.create(:user) }
  let(:third_user) { FactoryBot.create(:user) }
  let(:fourth_user) { FactoryBot.create(:user) }
  let(:fifth_user) { FactoryBot.create(:user) }
  let(:sixth_user) { FactoryBot.create(:user) }
  let(:seventh_user) { FactoryBot.create(:user) }

  let(:book) { FactoryBot.create(:one_book) }
  let(:second_book) { FactoryBot.create(:another_book) }
  let(:third_book) { FactoryBot.create(:other_book) }
  let(:fourth_book) { FactoryBot.create(:another_book) }
  let(:fifth_book) { FactoryBot.create(:other_book) }
  let(:sixth_book) { FactoryBot.create(:another_book) }
  let(:seventh_book) { FactoryBot.create(:other_book) }

  let(:diary_params) { { date: '1999/12/31', sleeping_hours: 7.5, feeling: 'satisfied' } }
  let(:book_params) { { book_id: book.id, read: true } }

  it '睡眠平均時間の上位6人を返す' do
    # 7人のユーザーの睡眠時間(日記)を作成する
    user.diaries.create(diary_params)
    second_user.diaries.create(diary_params)
    third_user.diaries.create(diary_params)
    fourth_user.diaries.create(diary_params)
    fifth_user.diaries.create(diary_params)
    sixth_user.diaries.create(diary_params)
    seventh_user.diaries.create(diary_params)
    # second_userの平均睡眠が10になるよう追加
    second_user.diaries.create({ date: '2000/01/01', sleeping_hours: 12.5, feeling: 'satisfied' })
    log_in_as(user)
    get api_v1_rankings_sleeping_hours_path
    expect(json['sleeping_hours_rank'].length).to eq(6)
    expect(json['sleeping_hours_rank'][0]['average']).to eq(10)
    expect(json['sleeping_hours_rank'][0]['rank']).to eq(1)
    expect(json['sleeping_hours_rank'][0]['user']['email']).to eq(second_user.email)
    expect(response.status).to eq(200)
  end

  it '未ログインでは睡眠平均時間の上位6人を返せない' do
    get api_v1_rankings_sleeping_hours_path
    expect(response.status).to eq(401)
  end

  it '読了数の上位6人を返す' do
    # 7人のユーザーが1冊読了したと登録する
    user.subscriptions.create(book_params)
    second_user.subscriptions.create(book_params)
    third_user.subscriptions.create(book_params)
    fourth_user.subscriptions.create(book_params)
    fifth_user.subscriptions.create(book_params)
    sixth_user.subscriptions.create(book_params)
    seventh_user.subscriptions.create(book_params)
    # second_userのみが2冊読了するように追加
    second_user.subscriptions.create(book_id: second_book.id, read: true)
    # readのfalse(積読)がカウントされないか判定
    third_user.subscriptions.create(book_id: third_book.id, read: false)
    log_in_as(user)
    get api_v1_rankings_reading_path
    expect(json['reading_rank'].length).to eq(6)
    expect(json['reading_rank'][0]['count']).to eq(2)
    expect(json['reading_rank'][0]['rank']).to eq(1)
    expect(json['reading_rank'][0]['user']['email']).to eq(second_user.email)
    expect(response.status).to eq(200)
  end

  it '未ログインでは読了数の上位6人を返せない' do
    get api_v1_rankings_reading_path
    expect(response.status).to eq(401)
  end

  it '読了本の人気6冊を返す' do
    # 7人のユーザーが7冊の本を登録する
    user.subscriptions.create(book_id: book.id, read: true)
    second_user.subscriptions.create(book_id: second_book.id, read: true)
    third_user.subscriptions.create(book_id: third_book.id, read: true)
    fourth_user.subscriptions.create(book_id: fourth_book.id, read: true)
    fifth_user.subscriptions.create(book_id: fifth_book.id, read: true)
    sixth_user.subscriptions.create(book_id: sixth_book.id, read: true)
    seventh_user.subscriptions.create(book_id: seventh_book.id, read: true)
    # third_bookが2人に読まれているように追加
    user.subscriptions.create(book_id: third_book.id, read: true)
    # カウントされないように、readをfalse(積読)に設定。
    second_user.subscriptions.create(book_id: third_book.id, read: false)
    log_in_as(user)
    get api_v1_rankings_read_books_path
    expect(json['read_books_rank'].length).to eq(6)
    expect(json['read_books_rank'][0]['count']).to eq(2)
    expect(json['read_books_rank'][0]['rank']).to eq(1)
    expect(json['read_books_rank'][0]['book']['isbn']).to eq(third_book.isbn)
    expect(response.status).to eq(200)
  end

  it '未ログインでは読了本、人気6冊を返せない' do
    get api_v1_rankings_read_books_path
    expect(response.status).to eq(401)
  end

  it '積読本、人気6冊を返す' do
    user.subscriptions.create(book_id: book.id, read: false)
    second_user.subscriptions.create(book_id: second_book.id, read: false)
    third_user.subscriptions.create(book_id: third_book.id, read: false)
    fourth_user.subscriptions.create(book_id: fourth_book.id, read: false)
    fifth_user.subscriptions.create(book_id: fifth_book.id, read: false)
    sixth_user.subscriptions.create(book_id: sixth_book.id, read: false)
    seventh_user.subscriptions.create(book_id: seventh_book.id, read: false)
    # fourth_bookが2人に積まれているように追加
    user.subscriptions.create(book_id: fourth_book.id, read: false)
    # カウントされないように、readをtrue(読了)に設定。
    second_user.subscriptions.create(book_id: fourth_book.id, read: true)
    log_in_as(user)
    get api_v1_rankings_stack_books_path
    expect(json['stack_books_rank'].length).to eq(6)
    expect(json['stack_books_rank'][0]['count']).to eq(2)
    expect(json['stack_books_rank'][0]['rank']).to eq(1)
    expect(json['stack_books_rank'][0]['book']['isbn']).to eq(fourth_book.isbn)
    expect(response.status).to eq(200)
  end

  it '未ログインでは積読本、人気6冊を返せない' do
    get api_v1_rankings_stack_books_path
    expect(response.status).to eq(401)
  end
end
