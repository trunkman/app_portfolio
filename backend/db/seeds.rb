# ユーザー
User.create!(name: 'Admin User',
             email: 'admin@example.com',
             password: 'foobar',
             password_confirmation: 'foobar',
             admin: true,
             activated: true,
             activated_at: Time.zone.now)

9.times do |n|
  name  = "#{n + 1}君"
  email = "example-#{n + 1}@example.com"
  User.create!(name: name,
               email: email,
               password: 'foobar',
               password_confirmation: 'foobar',
               activated: true,
               activated_at: Time.zone.now)
end

# ユーザーの一部を対象にマイクロポストを生成する
users = User.order(:created_at).take(6)
10.times do |n|
  content = "#{n}番目の投稿"
  users.each { |user| user.microposts.create!(content: content) }
end

# リレーションシップを作成する
# users = User.all
# user = users.first
# following = users[2..50]
# followers = users[3..40]
# following.each { |followed| user.follow(followed) }
# followers.each { |follower| follower.follow(user) }
