# frozen_string_literal: true

# ユーザー
User.create!(name: 'Admin User',
             email: 'admin@example.com',
             password: 'foobar',
             password_confirmation: 'foobar',
             ideal_sleeping_hours: 7.00,
             profile: 'わたしはこのアプリの管理者です。以前、慢性的な睡眠不足に悩ませておりましたが、睡眠方法を改善し、よく眠るようにより、Quality of Lifeが劇的に向上しました。皆さま方の睡眠向上のお役に立てればと思い、このアプリを制作しました。是非活用してみてください'
             admin: true,
             activated: true,
             activated_at: Time.zone.now)

29.times do |n|
  name  = "#{n + 1}君"
  email = "example-#{n + 1}@example.com"
  User.create!(name: name,
               email: email,
               password: 'foobar',
               password_confirmation: 'foobar',
               ideal_sleeping_hours: 7.00,
               activated: true,
               activated_at: Time.zone.now)
end

# ユーザーの一部を対象にマイクロポストを生成する
users = User.order(:created_at).take(6)
20.times do |n|
  content = "#{n}番目の投稿：ここに投稿が記載されていきます。"
  users.each { |user| user.microposts.create!(content: content) }
end

# リレーションシップを作成する
users = User.all
user = users.first
following = users[2..30]
followers = users[3..20]
following.each { |followed| user.follow(followed) }
followers.each { |follower| follower.follow(user) }
