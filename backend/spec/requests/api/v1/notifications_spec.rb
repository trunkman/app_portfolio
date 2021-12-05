# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::NotificationsController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:notification_follow) { other_user.active_notifications.create(visited_id: user.id, action: 'follow')}
  let(:notification_message) { other_user.active_notifications.create(visited_id: user.id, message_id: 1, action: 'message')}

  it 'ユーザーが受けた通知をすべて返す' do
    notification_follow
    log_in_as(user)
    get api_v1_notifications_path
    expect(json['notifications'].length).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインでは通知を返せない' do
    get api_v1_notifications_path
    expect(response.status).to eq(401)
  end

  it 'チェック済み通知をすべて削除する' do
    notification_follow
    log_in_as(user)
    # 通知のチェックをtrueにする
    get api_v1_notifications_path
    expect{ delete api_v1_notifications_all_delete_path }.to change(Notification, :count).by(-1)
    expect(response.status).to eq(200)
  end

  it 'チェック済みでない場合、削除されない' do
    notification_follow
    log_in_as(user)
    delete api_v1_notifications_all_delete_path
    expect(Notification.count).to eq(1)
    expect(response.status).to eq(200)
  end

  it '未ログインでは削除できない' do
    delete api_v1_notifications_all_delete_path
    expect(response.status).to eq(401)
  end
 
  it '新規通知のチェックができる' do
    notification_follow
    notification_message
    log_in_as(user)
    get api_v1_notifications_check_path
    expect(json['check_all']).to be_truthy
    expect(json['check_message']).to be_truthy
    expect(response.status).to eq(200)
  end

  it '未ログインでは新規通知のチェックができない' do
    get api_v1_notifications_check_path
    expect(response.status).to eq(401)
  end

end
