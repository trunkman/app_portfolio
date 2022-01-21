# frozen_string_literal: true

# ユーザー
first_user =
  User.create!(name: '睡眠の神',
               email: 'admin@example.com',
               password: 'password',
               password_confirmation: 'password',
               ideal_sleeping_hours: 8.00,
               profile: '管理人。よく寝むることで、みんなのQuality of Lifeが劇的に向上すると信じている。',
               avatar_url: 'https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_girl.png',
               admin: true,
               activated: true,
               activated_at: Time.zone.now)

second_user =
  User.create!(name: 'よく寝る子',
               email: 'mock2@example.com',
               password: 'password',
               password_confirmation: 'password',
               ideal_sleeping_hours: 8.00,
               profile: '寝るの大好きっ子。ただし、ドラマを見て遅くまで起きてることがよくある。そのため、土日は二度寝しがち。',
               avatar_url: 'https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_cat.png',
               admin: false,
               activated: true,
               activated_at: Time.zone.now)

third_user =
  User.create!(name: 'SleepMaster相澤',
               email: 'mock3@example.com',
               password: 'password',
               password_confirmation: 'password',
               ideal_sleeping_hours: 7.5,
               profile: '快適な睡眠を獲得するため、日々睡眠改善に取り組む。主に新しい睡眠知識を本から取り入れたり、さまざまな睡眠グッズを試している。',
               avatar_url: 'https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_sheep.png',
               admin: false,
               activated: true,
               activated_at: Time.zone.now)
forth_user =
  User.create!(name: '寝不足くん',
               email: 'mock4@example.com',
               password: 'password',
               password_confirmation: 'password',
               ideal_sleeping_hours: 7.50,
               profile: '夜更かししがちで寝不足気味。朝は二度寝がデフォルト。ここ最近、昼間のダルさの原因が睡眠不足と思ったため、改善に取り組もうとしている。',
               avatar_url: 'https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_rabbit.png',
               admin: false,
               activated: true,
               activated_at: Time.zone.now)

fifth_user =
  User.create!(name: 'ショートスリーパー',
               email: 'mock5@example.com',
               password: 'password',
               password_confirmation: 'password',
               ideal_sleeping_hours: 5.00,
               profile: '1日5時間くらい寝れば大体平気な人。趣味は読書とゲーム。家に引きこもりがち。愛用のマットレスは「コアラマットレス」',
               avatar_url: 'https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_milk.png',
               admin: false,
               activated: true,
               activated_at: Time.zone.now)

sixth_user =
  User.create!(name: 'ゲストユーザー',
               email: 'guest@example.com',
               password: 'foobar',
               password_confirmation: 'foobar',
               ideal_sleeping_hours: 7.50,
               profile: 'ゲストユーザー用のアカウントです。様々な人がこのアカウントを利用するので、その旨ご了承いただけると幸いです。',
               avatar_url: 'https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_orange.png',
               admin: false,
               activated: true,
               activated_at: Time.zone.now)

seventh_user =
  User.create!(name: '匿名希望',
               email: 'mock7@example.com',
               password: 'password',
               password_confirmation: 'password',
               ideal_sleeping_hours: 8.0,
               profile: '匿名希望。',
               avatar_url: 'https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_boy.png',
               admin: false,
               activated: true,
               activated_at: Time.zone.now)

eighth_user =
  User.create!(name: 'みる専',
               email: 'mock8@example.com',
               password: 'password',
               password_confirmation: 'password',
               ideal_sleeping_hours: 6.30,
               profile: '睡眠情報を収集することが目的のアカウント。発信する予定は特にないです。',
               admin: false,
               activated: true,
               activated_at: Time.zone.now)

# 投稿
first_user.microposts.create!(content: 'カフェインは眠る4時間前までに飲むといいそうです')
second_user.microposts.create!(content: '理想睡眠時間を守って睡眠していきたいと思いまーす!みんな応援よろしくお願いします！')
third_user.microposts.create!(content: '睡眠時間を確保するとここに宣言')
forth_user.microposts.create!(content: 'まずは自分の睡眠状態を把握することから始める。')
fifth_user.microposts.create!(content: '深夜にコーヒー飲むとやっぱり寝れないな。')
sixth_user.microposts.create!(content: 'これから睡眠管理していきます')

first_user.microposts.create!(content: '昼間に適度に身体を動かして、体を疲れさせましょう。夜に自然と眠くなります。')
second_user.microposts.create!(content: 'いい運動したから昨日はよく眠れた！！ほどよい疲れはいい睡眠につながる！！')
third_user.microposts.create!(content: 'お風呂は寝る1時間前がベスト。お風呂上がりの体内深部が下がると副交感神経が優位になって眠りやすくなるため')
forth_user.microposts.create!(content: 'グラフで見ると思ったより自分の睡眠時間が少ないのがわかるな...')
fifth_user.microposts.create!(content: 'FPSで興奮するとなかなか寝れないから、深夜はRPGがベスト。反論は認める')
sixth_user.microposts.create!(content: '睡眠時間や感情の見える化はいいですね。直感的に把握しやすく、楽しく記録できるので！')

first_user.microposts.create!(content: '寝不足が続くようであれば、昼寝をしましょう。15分くらいでも十分です。')
second_user.microposts.create!(content: '油断すると夜更かしして、睡眠時間減っちゃうなー')
third_user.microposts.create!(content: '快眠のためには寝室内の温度より湿度が大切。冬は加湿器使って湿度50%前後を目指そう')
forth_user.microposts.create!(content: '凸凹なグラフじゃなくて、真一文字のようなグラフを目指そう')
fifth_user.microposts.create!(content: '昼間疲れたので昨夜は深夜0時に就寝。翌朝の目覚めは絶好調。')
sixth_user.microposts.create!(content: '継続して睡眠日記を書くこと達成中。継続は力なり')

first_user.microposts.create!(content: '寝る前にスマホを使うのはやめましょう。その代わりに本を読んでみましょう。')
second_user.microposts.create!(content: 'お酒飲み過ぎて、全然寝れなかった...お酒はほどほどにしないと(_ _)')
third_user.microposts.create!(content: '横向きの違和感を軽減してくれるらしい抱き枕。リラックスできるか検証してみる')
third_user.microposts.create!(content: '初日はいい感じ。しばらく使って寝心地を確かめてみる')
forth_user.microposts.create!(content: '寝起きで絶好調な時もほぼなし...')
fifth_user.microposts.create!(content: '夜食を食べないで腹八分目状態だとよく眠れる')
sixth_user.microposts.create!(content: '睡眠時間が低い日はやっぱり不調な時が多いみたいです...睡眠時間の大切さが改めてわかりますね')

first_user.microposts.create!(content: '快眠を目指すにはまず規則正しい生活が必要です。可能な限り、寝る時間と起きる時間を決めましょう。')
second_user.microposts.create!(content: 'わたしのグラフ山あり谷ありだ。寝る時間が安定するようにしたいー！')
third_user.microposts.create!(content: '十分に睡眠が取れてないとワクチンの効果も最大限発揮されない',
                              image_url: 'https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/micropost/book_context.png')
forth_user.microposts.create!(content: 'カレンダーにニコニコ絵文字が少ないと悲しくなるから、もっと増やそう')
fifth_user.microposts.create!(content: '寝る時は汗を吸収してくれるゆったりな服がいい。メンズでもジェラートピケがおすすめ')
sixth_user.microposts.create!(content: 'もう少しで睡眠負債がなくなるので、誘惑に負けずに早寝を目指す！！')

second_user.microposts.create!(content: 'こんな寝室であれば、めっちゃ寝れるはず！睡眠時間は自然と確保できそう(^^)',
                               image_url: 'https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/micropost/bedroom.jpg')
third_user.microposts.create!(content: '目覚めたとき、日の光を浴びるべき。セロトニンを活性化するため。幸せホルモンと言われており、癒し効果もあり一石二鳥')

# フォロー
first_user.follow(second_user)
first_user.follow(third_user)
first_user.follow(forth_user)
first_user.follow(fifth_user)
first_user.follow(sixth_user)

second_user.follow(first_user)
second_user.follow(third_user)
second_user.follow(forth_user)
second_user.follow(fifth_user)

third_user.follow(first_user)
third_user.follow(second_user)
third_user.follow(fifth_user)

forth_user.follow(second_user)
forth_user.follow(third_user)
forth_user.follow(fifth_user)
forth_user.follow(sixth_user)

fifth_user.follow(forth_user)
fifth_user.follow(sixth_user)

sixth_user.follow(first_user)
sixth_user.follow(second_user)
sixth_user.follow(third_user)
sixth_user.follow(forth_user)
sixth_user.follow(fifth_user)

seventh_user.follow(second_user)
seventh_user.follow(forth_user)
seventh_user.follow(sixth_user)
seventh_user.follow(eighth_user)

eighth_user.follow(first_user)
eighth_user.follow(second_user)
eighth_user.follow(third_user)
eighth_user.follow(forth_user)
eighth_user.follow(fifth_user)
eighth_user.follow(sixth_user)
eighth_user.follow(seventh_user)
eighth_user.follow(eighth_user)

# 日記
first_user.diaries.create(date: '2022-01-14', sleeping_hours: 8.0, feeling: 'neutral_face')
first_user.diaries.create(date: '2022-01-15', sleeping_hours: 7.5, feeling: 'neutral_face')
first_user.diaries.create(date: '2022-01-16', sleeping_hours: 9.0, feeling: 'satisfied')
first_user.diaries.create(date: '2022-01-17', sleeping_hours: 7.0, feeling: 'dizzy_face')
first_user.diaries.create(date: '2022-01-18', sleeping_hours: 7.0, feeling: 'dizzy_face')
first_user.diaries.create(date: '2022-01-19', sleeping_hours: 8.5, feeling: 'neutral_face')
first_user.diaries.create(date: '2022-01-20', sleeping_hours: 8.5, feeling: 'neutral_face')
first_user.diaries.create(date: '2022-01-21', sleeping_hours: 8.5, feeling: 'satisfied')
first_user.diaries.create(date: '2022-01-22', sleeping_hours: 7.0, feeling: 'neutral_face')
first_user.diaries.create(date: '2022-01-23', sleeping_hours: 8.0, feeling: 'satisfied')
first_user.diaries.create(date: '2022-01-24', sleeping_hours: 8.5, feeling: 'satisfied')
first_user.diaries.create(date: '2022-01-25', sleeping_hours: 8.5, feeling: 'satisfied')

second_user.diaries.create(date: '2022-01-14', sleeping_hours: 8.0, feeling: 'neutral_face')
second_user.diaries.create(date: '2022-01-15', sleeping_hours: 10, feeling: 'satisfied')
second_user.diaries.create(date: '2022-01-16', sleeping_hours: 6.0, feeling: 'dizzy_face')
second_user.diaries.create(date: '2022-01-17', sleeping_hours: 8.0, feeling: 'neutral_face')
second_user.diaries.create(date: '2022-01-18', sleeping_hours: 7.5, feeling: 'neutral_face')
second_user.diaries.create(date: '2022-01-19', sleeping_hours: 8.0, feeling: 'satisfied')
second_user.diaries.create(date: '2022-01-20', sleeping_hours: 5.0, feeling: 'dizzy_face')
second_user.diaries.create(date: '2022-01-21', sleeping_hours: 6.0, feeling: 'dizzy_face')
second_user.diaries.create(date: '2022-01-22', sleeping_hours: 9.0, feeling: 'neutral_face')
second_user.diaries.create(date: '2022-01-23', sleeping_hours: 5.5, feeling: 'dizzy_face')
second_user.diaries.create(date: '2022-01-24', sleeping_hours: 9.5, feeling: 'neutral_face')
second_user.diaries.create(date: '2022-01-25', sleeping_hours: 8.0, feeling: 'satisfied')

third_user.diaries.create(date: '2022-01-14', sleeping_hours: 8.0, feeling: 'satisfied')
third_user.diaries.create(date: '2022-01-15', sleeping_hours: 7.5, feeling: 'satisfied')
third_user.diaries.create(date: '2022-01-16', sleeping_hours: 7.5, feeling: 'neutral_face')
third_user.diaries.create(date: '2022-01-17', sleeping_hours: 7.5, feeling: 'satisfied')
third_user.diaries.create(date: '2022-01-18', sleeping_hours: 7.0, feeling: 'neutral_face')
third_user.diaries.create(date: '2022-01-19', sleeping_hours: 8.0, feeling: 'neutral_face')
third_user.diaries.create(date: '2022-01-20', sleeping_hours: 7.5, feeling: 'satisfied')
third_user.diaries.create(date: '2022-01-21', sleeping_hours: 9.0, feeling: 'satisfied')
third_user.diaries.create(date: '2022-01-22', sleeping_hours: 7.0, feeling: 'neutral_face')
third_user.diaries.create(date: '2022-01-23', sleeping_hours: 7.5, feeling: 'neutral_face')
third_user.diaries.create(date: '2022-01-24', sleeping_hours: 8.0, feeling: 'satisfied')
third_user.diaries.create(date: '2022-01-25', sleeping_hours: 8.0, feeling: 'satisfied')

forth_user.diaries.create(date: '2022-01-14', sleeping_hours: 7.5, feeling: 'neutral_face')
forth_user.diaries.create(date: '2022-01-15', sleeping_hours: 7.0, feeling: 'neutral_face')
forth_user.diaries.create(date: '2022-01-16', sleeping_hours: 6.0, feeling: 'dizzy_face')
forth_user.diaries.create(date: '2022-01-17', sleeping_hours: 6.5, feeling: 'dizzy_face')
forth_user.diaries.create(date: '2022-01-18', sleeping_hours: 5.5, feeling: 'dizzy_face')
forth_user.diaries.create(date: '2022-01-19', sleeping_hours: 6.0, feeling: 'neutral_face')
forth_user.diaries.create(date: '2022-01-20', sleeping_hours: 5.0, feeling: 'dizzy_face')
forth_user.diaries.create(date: '2022-01-21', sleeping_hours: 5.5, feeling: 'dizzy_face')
forth_user.diaries.create(date: '2022-01-22', sleeping_hours: 7.0, feeling: 'neutral_face')
forth_user.diaries.create(date: '2022-01-23', sleeping_hours: 7.5, feeling: 'satisfied')
forth_user.diaries.create(date: '2022-01-24', sleeping_hours: 6.0, feeling: 'neutral_face')
forth_user.diaries.create(date: '2022-01-25', sleeping_hours: 6.5, feeling: 'dizzy_face')

fifth_user.diaries.create(date: '2022-01-21', sleeping_hours: 5.0, feeling: 'satisfied')
fifth_user.diaries.create(date: '2022-01-22', sleeping_hours: 3.0, feeling: 'neutral_face')
fifth_user.diaries.create(date: '2022-01-23', sleeping_hours: 6.0, feeling: 'satisfied')
fifth_user.diaries.create(date: '2022-01-24', sleeping_hours: 4.0, feeling: 'satisfied')
fifth_user.diaries.create(date: '2022-01-25', sleeping_hours: 5.0, feeling: 'satisfied')

sixth_user.diaries.create(date: '2022-01-14', sleeping_hours: 7.5, feeling: 'neutral_face')
sixth_user.diaries.create(date: '2022-01-15', sleeping_hours: 8.0, feeling: 'satisfied')
sixth_user.diaries.create(date: '2022-01-16', sleeping_hours: 6.0, feeling: 'dizzy_face')
sixth_user.diaries.create(date: '2022-01-17', sleeping_hours: 7.5, feeling: 'neutral_face')
sixth_user.diaries.create(date: '2022-01-18', sleeping_hours: 7.0, feeling: 'neutral_face')
sixth_user.diaries.create(date: '2022-01-19', sleeping_hours: 6.0, feeling: 'dizzy_face')
sixth_user.diaries.create(date: '2022-01-20', sleeping_hours: 7.0, feeling: 'dizzy_face')
sixth_user.diaries.create(date: '2022-01-21', sleeping_hours: 8.0, feeling: 'neutral_face')
sixth_user.diaries.create(date: '2022-01-22', sleeping_hours: 7.5, feeling: 'neutral_face')
sixth_user.diaries.create(date: '2022-01-23', sleeping_hours: 8.0, feeling: 'neutral_face')
sixth_user.diaries.create(date: '2022-01-24', sleeping_hours: 8.0, feeling: 'satisfied')
sixth_user.diaries.create(date: '2022-01-25', sleeping_hours: 8.0, feeling: 'satisfied')

seventh_user.diaries.create(date: '2022-01-20', sleeping_hours: 8.0, feeling: 'neutral_face')
seventh_user.diaries.create(date: '2022-01-21', sleeping_hours: 9.0, feeling: 'neutral_face')
seventh_user.diaries.create(date: '2022-01-22', sleeping_hours: 9.0, feeling: 'satisfied')
seventh_user.diaries.create(date: '2022-01-23', sleeping_hours: 8.5, feeling: 'satisfied')
seventh_user.diaries.create(date: '2022-01-24', sleeping_hours: 8.0, feeling: 'satisfied')
seventh_user.diaries.create(date: '2022-01-25', sleeping_hours: 7.5, feeling: 'neutral_face')

eighth_user.diaries.create(date: '2022-01-20', sleeping_hours: 8.0, feeling: 'satisfied')
eighth_user.diaries.create(date: '2022-01-21', sleeping_hours: 5.5, feeling: 'neutral_face')
eighth_user.diaries.create(date: '2022-01-22', sleeping_hours: 7.5, feeling: 'neutral_face')
eighth_user.diaries.create(date: '2022-01-23', sleeping_hours: 6.0, feeling: 'dizzy_face')
eighth_user.diaries.create(date: '2022-01-24', sleeping_hours: 8.0, feeling: 'neutral_face')
eighth_user.diaries.create(date: '2022-01-25', sleeping_hours: 6.0, feeling: 'dizzy_face')
