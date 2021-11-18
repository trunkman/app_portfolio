require 'rails_helper'

RSpec.describe Relationship, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:relationship) { user.active_relationships.create(followed_id: other_user.id) }
  
  it 'Relationshipが存在しているかどうか' do
    expect(relationship).to be_valid
  end

  it 'follower_idが空ではない' do
    relationship.follower_id = nil
    expect(relationship).not_to be_valid
  end

  it 'followed_idが空ではない' do
    relationship.followed_id = nil
    expect(relationship).not_to be_valid
  end

end
