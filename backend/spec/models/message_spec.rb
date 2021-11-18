# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Message, type: :model do
  let(:message) { FactoryBot.create(:message) }

  it 'messageが存在している確認' do
    expect(message).to be_valid
  end

  it 'user_idは空であってはいけない' do
    message.user_id = nil
    expect(message).not_to be_valid
  end

  it 'room_idは空であってはいけない' do
    message.room_id = nil
    expect(message).not_to be_valid
  end

  it 'contentが空であってはならない' do
    message.content = '  '
    expect(message).not_to be_valid
  end

  it 'contentが長すぎるべきではない' do
    message.content = 'a' * 251
    expect(message).not_to be_valid
  end

  it '最新順にメッセージが表示される' do
    @message_yesterday = FactoryBot.create(:message_yesterday)
    @message_now = FactoryBot.create(:message_now)
    expect(@message_now).to eq Message.first
  end

end
