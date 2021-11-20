# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::CommentsController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:micropost) { FactoryBot.create(:micropost) }

  it '未ログインユーザーはコメントできない' do
    post api_v1_comments_path, params: { comment: { user_id: user.id, micropost_id: micropost.id } }
    expect(response.status).to eq(401)
  end

  it '未ログインユーザーはコメントを削除できない' do
    comment = user.comments.create(content: 'Lorem ipsum', micropost_id: micropost.id)
    delete api_v1_comment_path(comment)
    expect(response.status).to eq(401)
  end

  it '他ユーザーのコメントは削除できない' do
    log_in_as(user)
    other_comment = other_user.comments.create(content: 'Lorem ipsum', micropost_id: micropost.id)
    delete api_v1_comment_path(other_comment)
    expect(response.status).to eq(403)
  end
end
