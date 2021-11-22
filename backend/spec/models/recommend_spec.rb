require 'rails_helper'

RSpec.describe Recommend, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:book) { FactoryBot.create(:book) }
  let(:recommend) { user.create_recommend(book_id: book.id)}

  it 'Recommendが存在している確認' do
    expect(book).to be_valid
  end

  it 'user_idは空であってはいけない' do
    recommend.user_id = nil
    expect(recommend).not_to be_valid
  end
  
  it 'user_idは一意である' do
    dupulicate_recommend = recommend.dup
    recommend.save
    expect(dupulicate_recommend).not_to be_valid
  end

  it 'book_idは空であってはいけない' do
    recommend.book_id = nil
    expect(recommend).not_to be_valid
  end

end
