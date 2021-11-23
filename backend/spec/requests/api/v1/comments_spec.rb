# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::CommentsController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:micropost) { FactoryBot.create(:micropost) }
  let(:comment) { user.comments.create(content: 'Lorem ipsum', micropost_id: micropost.id) }
  let(:params) { { comment: { content: 'Lorem ipsum', user_id: user.id, micropost_id: micropost.id } } }

  it '投稿にコメントする' do
    log_in_as(user)
    expect { post api_v1_comments_path, params: params }.to change(Comment, :count).by(+1)
    expect( Notification.count ).to eq(1)
    expect(response.status).to eq(201)
  end

  it 'コメントが保存されない時、エラーを返す' do
    log_in_as(user)
    expect { post api_v1_comments_path, params: { comment: { content: '',
                                                  user_id: user.id,
                                                  micropost_id: micropost.id } }
            }.to change(Comment, :count).by(0)
    expect(response.status).to eq(422)
  end

  it '未ログインユーザーはコメントできない' do
    post api_v1_comments_path, params: params
    expect(response.status).to eq(401)
  end

  it 'コメントを削除する' do
    comment 
    log_in_as(user)
    expect { delete api_v1_comment_path(comment) }.to change(Comment, :count).by(-1)
    expect(response.status).to eq(200)
  end
  
  it '未ログインユーザーはコメントを削除できない' do
    comment
    delete api_v1_comment_path(comment)
    expect(response.status).to eq(401)
  end

  it '他ユーザーはコメントを削除できない' do
    comment
    log_in_as(other_user)
    delete api_v1_comment_path(comment)
    expect(response.status).to eq(403)
  end
end
