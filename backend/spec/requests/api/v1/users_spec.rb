# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::UsersController', type: :request do
  let(:user)       { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:admin_user) { FactoryBot.create(:admin) }

  # let(:micropost) { FactoryBot.create(:micropost) }
  # let(:like) { user.likes.create(micropost_id: micropost.id) }
  # let(:comment) { user.comments.create(content: 'Lorem ipsum', micropost_id: micropost.id) }


  it 'ユーザー一覧を取得する' do
    log_in_as(user)
    other_user
    get api_v1_users_path(user)
    expect(response.status).to eq(200)
    expect(json['users'].length).to eq(2)
  end

  it '未ログインではユーザー一覧を取得できない' do
    get api_v1_users_path
    expect(response.status).to eq(401)
  end

  it 'ユーザーページを取得する' do
    log_in_as(user)
    # other_userにフォローし、フォローされたユーザーを作成
    user.follow(other_user)
    other_user.follow(user)
    get api_v1_user_path(user)
    expect(response.status).to eq(200)
    expect(json['user']['email']).to eq(user.email)
    expect(json['following_ids'].length).to eq(1)
    expect(json['followers_ids'].length).to eq(1)
  end

  it '未ログインではユーザーページを取得できない' do
    get api_v1_user_path(user)
    expect(response.status).to eq(401)
  end

  it '新規ユーザーを登録する' do
    post api_v1_signup_path, params: { user: { name: '新規ユーザー',
                                               email: 'test@example.com',
                                               password: 'foobar',
                                               password_confirmation: 'foobar' } }
    expect(response.status).to eq(201)
  end

  it '新規ユーザーを登録できなかった時、エラーを返す' do
    post api_v1_signup_path, params: { user: { name: '新規ユーザー',
                                               email: 'test@example.com',
                                               password: 'foobar',
                                               password_confirmation: 'password' } }
    expect(response.status).to eq(422)
  end

  it 'ユーザー情報を更新する' do
    log_in_as(user)
    patch api_v1_user_path(user), params: { user: { name: '更新ユーザー',
                                                    email: 'example@example.com',
                                                    password: 'password',
                                                    password_confirmation: 'password' } }
    expect(response.status).to eq(200)
    expect(json['user']['email']).to eq('example@example.com')
  end

  it 'ユーザー情報を登録できなかった時、エラーを返す' do
    log_in_as(user)
    patch api_v1_user_path(user), params: { user: { name: '更新ユーザー',
                                                    email: 'example@example.com',
                                                    password: 'password',
                                                    password_confirmation: '12345678' } }
    expect(response.status).to eq(422)
  end

  it '未ログインのユーザーは更新できない' do
    patch api_v1_user_path(user), params: { user: { name: '更新ユーザー',
                                                    email: 'example@example.com',
                                                    password: 'password',
                                                    password_confirmation: 'password' } }
    expect(response.status).to eq(401)
  end

  it '他ユーザーの更新はできない' do
    log_in_as(user)
    patch api_v1_user_path(other_user), params: { user: { name: '更新ユーザー',
                                                          email: 'example@example.com',
                                                          password: 'password',
                                                          password_confirmation: 'password' } }
    expect(response.status).to eq(403)
  end

  it '管理者はユーザーを削除できる' do
    log_in_as(admin_user)
    delete_user = FactoryBot.create(:user)
    expect { delete api_v1_user_path(delete_user) }.to change(User, :count).by(-1)
    expect(response.status).to eq(200)
  end

  it '未ログインは削除できない' do
    delete_user = FactoryBot.create(:user)
    delete api_v1_user_path(delete_user)
    expect(response.status).to eq(401)
  end

  it 'ユーザー削除はできない' do
    log_in_as(user)
    delete_user = FactoryBot.create(:user)
    delete api_v1_user_path(delete_user)
    expect(response.status).to eq(403)
  end

  it 'フォロー中のユーザーを取得する' do
    log_in_as(user)
    # userがother_userをフォローする
    user.active_relationships.create(followed_id: other_user.id)
    get following_api_v1_user_path(user)
    expect(json['users'].length).to eq(1)
    expect(json['following_ids'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインはフォロー中のユーザーを取得できない' do
    get following_api_v1_user_path(user)
    expect(response.status).to eq(401)
  end

  it 'フォロワーを取得する' do
    log_in_as(user)
    # userがother_userにフォローされる
    other_user.active_relationships.create(followed_id: user.id)
    get followers_api_v1_user_path(user)
    expect(json['users'].length).to eq(1)
    expect(json['following_ids'].length).to eq(0)
    expect(response.status).to eq(200)
  end

  it '未ログインはフォロワーを取得できない' do
    get followers_api_v1_user_path(user)
    expect(response.status).to eq(401)
  end

  it '投稿一覧(コメント&いいね付き)を取得する' do
    log_in_as(user)
    # 投稿を作成する
    micropost = user.microposts.create(content: 'Lorem ipsum')
    # コメント、いいねを作成する
    user.comments.create(content: 'Lorem ipsum', micropost_id: micropost.id)
    user.likes.create(micropost_id: micropost.id)
    get microposts_api_v1_user_path(user)
    expect(json['microposts'].length).to eq(1)
    expect(json['comments'].length).to eq(1)
    expect(json['liked_micropost_ids'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインは投稿一覧(コメント&いいね付き)を取得できない' do
    get microposts_api_v1_user_path(user)
    expect(response.status).to eq(401)
  end

  # it 'いいねした投稿一覧を返す' do
  #   like
  #   log_in_as(user)
  #   get api_v1_likes_path 
  #   expect(json['liked_microposts'].length).to eq(1)
  #   expect(response.status).to eq(200)
  # end

  # it '未ログインユーザーはいいねした投稿一覧を返せない' do
  #   like
  #   get api_v1_likes_path 
  #   expect(response.status).to eq(401)
  # end

  # it 'コメント&コメントした投稿一覧を返す' do
  #   micropost
  #   comment
  #   log_in_as(user)
  #   get api_v1_comments_path 
  #   expect(json['comments'].length).to eq(1)
  #   expect(json['commented_microposts'].length).to eq(1)
  #   expect(response.status).to eq(200)
  # end

  # it '未ログインユーザーはコメント&コメントした投稿一覧を返せない' do
  #   micropost
  #   comment
  #   get api_v1_comments_path 
  #   expect(response.status).to eq(401)
  # end

  it 'トークルーム一覧を取得する' do
    log_in_as(user)
    # トークルームを作成する
    room = FactoryBot.create(:room)
    # ユーザーとルームを紐づける
    user.entries.create(room_id: room.id)
    get rooms_api_v1_user_path(user)
    expect(json['entries'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインはトークルーム一覧を取得できない' do
    get rooms_api_v1_user_path(user)
    expect(response.status).to eq(401)
  end

  it 'ユーザーの登録本一覧を取得する' do
    log_in_as(user)
    # 本の2冊を登録する
    read_book = FactoryBot.create(:read_book)
    stack_book = FactoryBot.create(:stack_book)
    # 読了本、積読本にそれぞれ登録する
    user.subscriptions.create(book_id: read_book.id, read: true)
    user.subscriptions.create(book_id: stack_book.id, read: false)
    get books_api_v1_user_path(user)
    expect(json['read_books'].length).to eq(1)
    expect(json['stack_books'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインはユーザー登録本一覧を取得できない' do
    get microposts_api_v1_user_path(user)
    expect(response.status).to eq(401)
  end

  it '日記情報を取得する' do
    log_in_as(user)
    diary = FactoryBot.create(:diary)
    # 日記を作成する
    user.diaries.create(user_id: user.id,
                        date: diary.date,
                        sleeping_hours: diary.sleeping_hours,
                        feeling: diary.feeling)
    get diaries_api_v1_user_path(user)
    expect(json['diaries'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインは日記情報を取得できない' do
    get diaries_api_v1_user_path(user)
    expect(response.status).to eq(401)
  end
end
