require 'rails_helper'

Rspec.feature 'User_signup', type: :feature do
  xscenario '有効なユーザー登録のテスト' do 
    visit signup_path
    fill in "name", with 'Example User'
    fill in "email", with 'user@example.com'
    fill in "password", with 'password'
    fill in "password_confirmation", with 'password'
    click_on ''
    expect(page).to have_content ''
  end
end
