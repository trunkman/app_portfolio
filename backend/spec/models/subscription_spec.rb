# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Subscription, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:book) { FactoryBot.create(:book) }
  let(:subscription) { user.subscriptions.build(book_id: book.id) }

  it 'Subscriptionが存在している確認' do
    expect(subscription).to be_valid
  end

  it 'user_idは空であってはいけない' do
    subscription.user_id = nil
    expect(subscription).not_to be_valid
  end

  it 'book_idはからであってはいけない' do
    subscription.book_id = nil
    expect(subscription).not_to be_valid
  end

  it 'user_idとbook_itの組み合わせは一意である' do
    dupulicate_subscription = subscription.dup
    subscription.save
    expect(dupulicate_subscription).not_to be_valid
  end
end
