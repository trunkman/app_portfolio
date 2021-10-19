# require 'rails_helper'

# RSpec.feature 'ユーザーの新規登録テスト', type: :feature do
#   scenario '有効なユーザーで登録する' do
#     # Homeページに移動
#     visit api_v1_root_path
#     # ダイアログから新規登録する
#     click_on '新規登録'
#     fill_in 'name', with: 'Example User'
#     fill_in 'email', with: 'user@example.com'
#     fill_in 'password', with: 'password'
#     fill_in 'password_confirmation', with: 'password'
#     click_on '登録する'
#     expect(page).to have_content 'ユーザーページ'
#   end

#   scenario 'テキストの存在を確認する' do
#     visit  api_v1_root_path
#     find('a', text: '新規登録').click
#   end
# end
