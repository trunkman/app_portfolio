# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Room, type: :model do
  let(:room) { FactoryBot.create(:room) }

  it 'トークルームが存在している確認' do
    expect(room).to be_valid
  end

end
