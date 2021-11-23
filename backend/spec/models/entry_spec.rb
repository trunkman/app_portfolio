# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Entry, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:room) { FactoryBot.create(:room) }
  let(:entry) { user.entries.create(room_id: room.id) }

  it 'Entryが存在している確認' do
    expect(entry).to be_valid
  end

  it 'user_idは空であってはいけない' do
    entry.user_id = nil
    expect(entry).not_to be_valid
  end

  it 'room_idは空であってはいけない' do
    entry.room_id = nil
    expect(entry).not_to be_valid
  end

  it 'user_idとroom_itの組み合わせは一意である' do
    dupulicate_entry = entry.dup
    entry.save
    expect(dupulicate_entry).not_to be_valid
  end

end
