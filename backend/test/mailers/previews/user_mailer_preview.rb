class UserMailerPreview < ActionMailer::Preview
  # プレビューが表示されないので後日検討

  # アカウント有効化メールのプレビューは以下
  # http://54.250.110.27:3000/rails/mailers/user_mailer/account_activation
  def account_activation
    user = User.first
    user.activation_token = User.new_token
    UserMailer.account_activation(user)
  end

  # パスワードリセットメールのプレビューは以下
  # http://54.250.110.27:3000/rails/mailers/user_mailer/password_reset
  def password_reset
    user = User.first
    user.reset_token = User.new_token
    UserMailer.password_reset(user)
  end
  
end
