# frozen_string_literal: true

# ユーザー
User.create!(name: '睡眠の神',
             email: 'admin@example.com',
             password: 'foobar',
             password_confirmation: 'foobar',
             ideal_sleeping_hours: 8.00,
             profile: '自称、睡眠の神。よく寝むることで、みんなのQuality of Lifeが劇的に向上することを信じている。',
             admin: true,
             activated: true,
             activated_at: Time.zone.now)

User.create!(name: 'よく 寝る子',
             email: 'neruko@example.com',
             password: 'foobar',
             password_confirmation: 'foobar',
             ideal_sleeping_hours: 9.00,
             profile: '寝るの大好きっ子。深夜0時過ぎて寝ると翌日のパフォーマンスが30%ダウンする。土日は二度寝しがち。',
             admin: false,
             activated: true,
             activated_at: Time.zone.now)

User.create!(name: 'SleepMaster 相澤',
             email: 'aizawa@example.com',
             password: 'foobar',
             password_confirmation: 'foobar',
             ideal_sleeping_hours: 7.5,
             profile: '快適な睡眠するために日々改善に取り組む。主に新しい睡眠知識を本から取り入れたり、さまざまな睡眠グッズを試している',
             admin: false,
             activated: true,
             activated_at: Time.zone.now)

User.create!(name: '寝不足くん',
             email: 'nebusoku@example.com',
             password: 'foobar',
             password_confirmation: 'foobar',
             ideal_sleeping_hours: 7.00,
             profile: '夜更かししがちで寝不足気味。朝は二度寝がデフォルト。土日の遅寝がなにより好き。',
             admin: false,
             activated: true,
             activated_at: Time.zone.now)

User.create!(name: 'ショートスリーパー',
             email: 'short@example.com',
             password: 'foobar',
             password_confirmation: 'foobar',
             ideal_sleeping_hours: 5.00,
             profile: '1日5時間くらい寝れば大体平気な人。趣味は読書とゲーム。家に引きこもりがち',
             admin: false,
             activated: true,
             activated_at: Time.zone.now)

User.create!(name: 'ゲスト',
             email: 'guest@example.com',
             password: 'foobar',
             password_confirmation: 'foobar',
             ideal_sleeping_hours: 7.50,
             profile: 'ゲストユーザー用のアカウントです。',
             admin: false,
             activated: true,
             activated_at: Time.zone.now)

5.times do |n|
  name  = "#{6 + 1}君"
  email = "example-#{n + 1}@example.com"
  profile = "#{n + 1}君のプロフィールとなります。#{n + 1}の経歴、趣味、特技、好きな食べ物などが記載されます。"
  User.create!(name: name,
               email: email,
               password: 'foobar',
               password_confirmation: 'foobar',
               ideal_sleeping_hours: 7.00,
               profile: profile,
               activated: true,
               activated_at: Time.zone.now)
end

# ユーザーの一部を対象にマイクロポストを生成する
users = User.order(:created_at).take(6)
4.times do |n|
  content = "#{n}番目の投稿：ここに投稿が記載されていきます。"
  users.each { |user| user.microposts.create!(content: content) }
end

# リレーションシップを作成する
users = User.all
user = users.first
following = users[2..6]
followers = users[2..6]
following.each { |followed| user.follow(followed) }
followers.each { |follower| follower.follow(user) }
