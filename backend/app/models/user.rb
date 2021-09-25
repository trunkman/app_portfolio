class User < ApplicationRecord
  attr_accessor :remember_token, :activation_token, :reset_token

  before_save   { email.downcase! }
  before_create :create_activation_digest

  # バリデーション
  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: true
  # passwordとpassword_confirmationの仮想属性が利用できるようになり、DBにpassword_digestで保存。
  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true

  ## クラスメソッド

  # 渡された文字列のハッシュを返す
  def self.digest(string)
    cost = if ActiveModel::SecurePassword.min_cost
             BCrypt::Engine::MIN_COST
           else
             BCrypt::Engine.cost
           end
    BCrypt::Password.create(string, cost: cost)
  end

  # ランダムなトークンを返す
  def self.new_token
    SecureRandom.urlsafe_base64
  end

  ## インスタンスメソッド

  # 永続セッションのためにユーザーをデータベースに記録する
  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  # 渡されたtokenがdigestと一致した場合、trueを返す
  def authenticated?(attribute, token)
    digest = send("#{attribute}_digest")
    return false if digest.nil?

    BCrypt::Password.new(digest).is_password?(token)
  end

  # ユーザーのログイン情報を破棄する
  def forget
    update_attribute(:remember_digest, nil)
  end

  # アカウントを有効にする
  def activate
    update_columns(activated: true,
                   activated_at: Time.zone.now)
  end

  # 有効化用のメールを送信する
  def send_activation_email
    UserMailer.account_activation(self).deliver.now
  end

  # パスワード再設定の属性を設定する
  def create_reset_digest
    self.reset_token = User.new_token
    update_columns(reset_digest: User.digest(reset_token),
                   reset_sent_at: Time.zone.now)
  end

  # パスワード再設定のメールを送信する
  def send_reset_email
    UserMailer.account_reset(self).deliver.now
  end

  # パスワード再設定が期限切れの場合、trueを返す
  def password_reset_expired?
    reset_sent_at < 2.hours.ago
  end

  private

  # 有効化トークンとダイジェストの作成および代入
  def create_activation_digest
    self.activation_token = User.new_token
    self.activation_digest = User.digest(activation_token)
  end
end
