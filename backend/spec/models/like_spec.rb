require 'rails_helper'

RSpec.describe Like, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:micropost) { FactoryBot.create(:micropost) }
  let(:like) { user.likes.build(micropost_id: micropost.id)}

  it 'いいねが存在している確認' do
    expect(like).to be_valid
  end
  
  it 'user_idは空であってはいけない' do
    like.user_id = nil
    expect(like).not_to be_valid
  end

  it 'micropost_idはからであってはいけない' do
    like.micropost_id = nil
    expect(like).not_to be_valid
  end

  it 'user_idとmicropost_itの組み合わせは一意である' do
    dupulicate_like = like.dup
    like.save
    expect(dupulicate_like).not_to be_valid
  end

end
