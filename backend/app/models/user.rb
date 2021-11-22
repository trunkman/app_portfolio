# frozen_string_literal: true

class User < ApplicationRecord
  # 関連付け
  has_one_attached :image
  has_many :microposts, dependent: :destroy
  has_many :active_relationships,  class_name: 'Relationship',
                                   foreign_key: 'follower_id',
                                   dependent: :destroy
  has_many :passive_relationships, class_name: 'Relationship',
                                   foreign_key: 'followed_id',
                                   dependent: :destroy
  has_many :following, through: :active_relationships,  source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :likes, dependent: :destroy
  has_many :liked_microposts, through: :likes, source: :micropost
  has_many :comments, dependent: :destroy
  has_many :commented_microposts, through: :comments, source: :micropost
  has_many :entries, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :diaries, dependent: :destroy
  # setter, getter属性を定義
  attr_accessor :remember_token,
                :activation_token,
                :reset_token

  # beforeフィルター
  before_save   { email.downcase! }
  before_create :create_activation_digest
  # バリデーション
  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: true
  has_secure_password # 仮想属性が利用可(password, password_confirmation)
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
  validates :profile, length: { maximum: 150 }
  validates :ideal_sleeping_hours, presence: true, length: { maximum: 4 }

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
    UserMailer.account_activation(self).deliver_now
  end

  # パスワード再設定の属性を設定する
  def create_reset_digest
    self.reset_token = User.new_token
    update_columns(reset_digest: User.digest(reset_token),
                   reset_sent_at: Time.zone.now)
  end

  # パスワード再設定のメールを送信する
  def send_password_reset_email
    UserMailer.password_reset(self).deliver_now
  end

  # パスワード再設定が期限切れの場合、trueを返す
  def password_reset_expired?
    reset_sent_at < 2.hours.ago
  end

  # ユーザーをフォローする
  def follow(other_user)
    following << other_user
  end

  # ユーザーのフォローを解除する
  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  # 現在のユーザーをフォローしている場合、trueを返す
  def following?(other_user)
    following.include?(other_user)
  end

  def feed
    Micropost.where('user_id = ?', id)
  end

  private

  # 有効化トークンとダイジェストの作成および代入
  def create_activation_digest
    self.activation_token = User.new_token
    self.activation_digest = User.digest(activation_token)
  end
end
