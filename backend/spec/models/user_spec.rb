require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { FactoryBot.create(:alice) }

  it 'ユーザーが存在している確認' do
    user.valid?
    expect(user).to be_valid
  end

  describe 'nameのテスト' do
    it 'nameが空であってはならない' do
      user.name = '  '
      expect(user).not_to be_valid
    end

    it 'nameが長すぎるべきではない' do
      user.name = 'a' * 51
      expect(user).not_to be_valid
    end
  end

  describe 'emailのテスト' do
    it 'emailが空であってはならない' do
      user.email = '  '
      expect(user).not_to be_valid
    end

    it 'emailが長すぎるべきではない' do
      user.email = 'a' * 244 + '@example.com'
      expect(user).not_to be_valid
    end

    it '正規表現のemailは許容される' do
      valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                           first.last@foo.jp alice+bob@baz.cn]
      valid_addresses.each do |valid_address|
        user.email = valid_address
        expect(user).to be_valid
      end
    end

    it '正規表現でないemailは弾かれる' do
      invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                             foo@bar_baz.com foo@bar+baz.com]
      invalid_addresses.each do |invalid_address|
        user.email = invalid_address
        expect(user).not_to be_valid
      end
    end

    it 'emailは一意性である' do
      dupulicate_user = user.dup
      user.save
      expect(dupulicate_user).not_to be_valid
    end

    it 'emailは小文字でsaveされる' do
      mixed_case_email = 'Foo@ExAMple.Com'
      user.email = mixed_case_email
      user.save
      expect(mixed_case_email.downcase).to eq user.reload.email
    end
  end

  describe 'パスワードのテスト' do
    it 'パスワードは空であってはならない' do
      user.password = user.password_confirmation = '  '
      expect(user).not_to be_valid
    end

    it 'パスワードは6桁以上であるべき' do
      user.password = user.password_confirmation = 'a' * 5
      expect(user).not_to be_valid
    end
  end

  describe 'remember meのテスト' do
    it 'nil digestの時、authenticated?はfalseであるべき' do
      expect(user.authenticated?(:remember, '')).to be_falsey
    end
  end
end
