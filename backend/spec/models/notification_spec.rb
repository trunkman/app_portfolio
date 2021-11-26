# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Notification, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:notification) { user.active_notifications.create(visited_id: other_user.id, action: 'like') }

  it 'Notificationが存在している確認' do
    expect(notification).to be_valid
  end

  it 'visitor_idは空であってはいけない' do
    notification.visitor_id = nil
    expect(notification).not_to be_valid
  end

  it 'visited_idは空であってはいけない' do
    notification.visited_id = nil
    expect(notification).not_to be_valid
  end

  it 'actionは空であってはいけない' do
    notification.action = nil
    expect(notification).not_to be_valid
  end
end
