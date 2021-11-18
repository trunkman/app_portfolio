# frozen_string_literal: true

module SessionsHelper
  # 渡されたユーザーでログインする
  def log_in(user)
    session[:user_id] = user.id
  end

  # ユーザーのセッションを永続的にする
  def remember(user)
    user.remember
    cookies.permanent.signed[:user_id] = { value: user.id,
                                           httponly: true }
    cookies.permanent[:remember_token] = { value: user.remember_token,
                                           httponly: true }
  end

  # 現在ログイン中のユーザーを返す（いる場合）
  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      if user.&authenticated?(:remenmber, cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end

  # ユーザーがログインしている場合、tureで返す
  def logged_in?
    !current_user.nil?
  end

  # 永続的セッションを破棄する
  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end

  # 現在のユーザーをログアウトする
  def log_out
    forget(@current_user)
    session.delete(:user_id)
    @current_user = nil
  end

  # 渡されたユーザーがcurrentユーザーであればtrueを返す
  def current_user?(user)
    user && user == current_user
  end

  # 記録したURL（もしくはデフォルト値）にリダイレクト
  def redirect_back_or(default)
    redirect_to(session[:forwarding_url] || default)
    session.delete(:forwarding_url)
  end

  # アクセスしようとしたURLを覚えておく
  def store_location
    session[:forwarding_url] = request.original_url if request.get?
  end
end
