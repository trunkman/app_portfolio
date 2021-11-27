# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::NotificationsController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:notification) { other_user.notifications.create(visited_id: user.id, action: 'follow')}

  it 'ユーザーが受けた通知をすべて返す' do
    notification
    log_in_as(user)
    get api_v1_notifications_path
    expect(json['notifications'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインでは通知を返せない' do
    get api_v1_notifications_path
    expect(json['notifications'].length).to eq(1)
    expect(response.status).to eq(401)
  end

  it 'チェック済み通知をすべて削除する' do
    notification
    log_in_as(user)
    # 通知のチェックをtrueにする
    get api_v1_notifications_path
    expect{delete "/api/v1/notifications"}.to change(Notification, :count).by(-1)
    expect(response.status).to eq(200)
  end

  it 'チェック済みでない場合、削除されない' do
    notification
    log_in_as(user)
    delete '/api/v1/notifications'
    expect(Notification.count).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインでは削除できない' do
    delete '/api/v1/notifications'
    expect(response.status).to eq(401)
  end


end
