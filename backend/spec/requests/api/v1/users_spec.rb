# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::UsersController', type: :request do
  let(:user)       { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:admin_user) { FactoryBot.create(:admin) }
  let(:micropost) { micropost = user.microposts.create(content: content) }
  let(:content) { 'Lorem ipsum' }
  let(:params) { { user: { name: 'exampleユーザー',email: 'example@example.com',
                               password: 'example', password_confirmation: 'example' } } }

  it 'ユーザー一覧を返す' do
    other_user
    log_in_as(user)
    get api_v1_users_path(user)
    expect(json['users'].length).to eq(2)
    expect(response.status).to eq(200)
  end

  it '未ログインではユーザー一覧を返せない' do
    get api_v1_users_path
    expect(response.status).to eq(401)
  end

  it 'ユーザーページを返す' do
    # other_userとのフォロー関係を構築
    user.follow(other_user)
    other_user.follow(user)
    # micropostを作成
    micropost
    log_in_as(user)
    get api_v1_user_path(user)
    expect(json['user']['email']).to eq(user.email)
    expect(json['following_ids'].length).to eq(1)
    expect(json['followers_ids'].length).to eq(1)
    expect(json['microposts'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインではユーザーページを返せない' do
    get api_v1_user_path(user)
    expect(response.status).to eq(401)
  end

  it '新規ユーザーを登録する' do
    post api_v1_signup_path, params: params
    expect(response.status).to eq(201)
  end

  it '新規ユーザーを登録できなかった時、エラーを返す' do
    post api_v1_signup_path, params: { user: { name: 'exampleユーザー',
                                                email: 'example@example.com',
                                                password: 'example',
                                                password_confirmation: '12345678' } }
    expect(response.status).to eq(422)
  end

  it 'ユーザー情報を更新する' do
    log_in_as(user)
    patch api_v1_user_path(user), params: params
    expect(response.status).to eq(200)
    expect(json['user']['email']).to eq('example@example.com')
  end

  it 'ユーザー情報を登録できなかった時、エラーを返す' do
    log_in_as(user)
    patch api_v1_user_path(user), params: { user: { name: 'exampleユーザー',
                                                    email: 'example@example.com',
                                                    password: 'example',
                                                    password_confirmation: '12345678' } }
    expect(response.status).to eq(422)
  end

  it '未ログインのユーザーは更新できない' do
    patch api_v1_user_path(user), params: params
    expect(response.status).to eq(401)
  end

  it '他ユーザーの更新はできない' do
    log_in_as(user)
    patch api_v1_user_path(other_user), params: params
    expect(response.status).to eq(403)
  end

  it '管理者はユーザーを削除できる' do
    # ユーザーを作成
    user
    log_in_as(admin_user)
    expect { delete api_v1_user_path(user) }.to change(User, :count).by(-1)
    expect(response.status).to eq(200)
  end

  it '未ログインでは削除できない' do
    user
    delete api_v1_user_path(user)
    expect(response.status).to eq(401)
  end

  it 'ユーザー削除はできない' do
    other_user
    log_in_as(user)
    delete api_v1_user_path(other_user)
    expect(response.status).to eq(403)
  end

  it 'フォロー中のユーザーを返す' do
    # userがother_userをフォローする
    user.active_relationships.create(followed_id: other_user.id)
    log_in_as(user)
    get following_api_v1_user_path(user)
    expect(json['users'].length).to eq(1)
    expect(json['following_ids'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインではフォロー中のユーザーを返せない' do
    get following_api_v1_user_path(user)
    expect(response.status).to eq(401)
  end

  it 'フォロワーを返す' do
    # userがother_userにフォローされる
    other_user.active_relationships.create(followed_id: user.id)
    log_in_as(user)
    get followers_api_v1_user_path(user)
    expect(json['users'].length).to eq(1)
    expect(json['following_ids'].length).to eq(0)
    expect(response.status).to eq(200)
  end

  it '未ログインではフォロワーを返せない' do
    get followers_api_v1_user_path(user)
    expect(response.status).to eq(401)
  end

  it '投稿一覧(コメント&いいね付き)を返す' do
    micropost
    # コメント&いいねを作成する
    user.likes.create(micropost_id: micropost.id)
    user.comments.create(content: content, micropost_id: micropost.id)
    log_in_as(user)
    get microposts_api_v1_user_path(user)
    expect(json['microposts'].length).to eq(1)
    expect(json['liked_micropost_ids'].length).to eq(1)
    expect(json['comments'].length).to eq(1)
    expect(json['commented_microposts'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインでは投稿一覧(コメント&いいね付き)を返せない' do
    get microposts_api_v1_user_path(user)
    expect(response.status).to eq(401)
  end


  it 'トークルーム一覧を返す' do
    # トークルームを作成する
    room = FactoryBot.create(:room)
    # ユーザーとルームを紐づける
    user.entries.create(room_id: room.id)
    log_in_as(user)
    get rooms_api_v1_user_path(user)
    expect(json['entries'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインではトークルーム一覧を返せない' do
    get rooms_api_v1_user_path(user)
    expect(response.status).to eq(401)
  end

  it 'ユーザーの登録本一覧を返す' do
    # 本の2冊を作成する
    read_book = FactoryBot.create(:read_book)
    stack_book = FactoryBot.create(:stack_book)
    # 読了本、積読本でそれぞれ登録する
    user.subscriptions.create(book_id: read_book.id, read: true)
    user.subscriptions.create(book_id: stack_book.id, read: false)
    log_in_as(user)
    get books_api_v1_user_path(user)
    expect(json['read_books'].length).to eq(1)
    expect(json['stack_books'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインではユーザー登録本一覧を返せない' do
    get microposts_api_v1_user_path(user)
    expect(response.status).to eq(401)
  end

  it '日記情報を返す' do
    # 日記を作成する
    user.diaries.create(date: '1999/12/31',
                        sleeping_hours: 10.0,
                        feeling: 'good' )
    log_in_as(user)
    get diaries_api_v1_user_path(user)
    expect(json['diaries'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインでは日記情報を返せない' do
    get diaries_api_v1_user_path(user)
    expect(response.status).to eq(401)
  end
end
