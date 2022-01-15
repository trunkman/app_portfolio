# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def account_activation(user)
    @user = user
    mail to: user.email, subject: '睡眠補完計画：アカウント有効化メール'
  end

  def password_reset(user)
    @user = user
    mail to: user.email, subject: '睡眠補完計画：パスワード再設定メール'
  end
end
