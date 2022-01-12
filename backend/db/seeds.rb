# frozen_string_literal: true

# ユーザー
first_user = 
User.create!(name: '睡眠の神',
             email: 'admin@example.com',
             password: 'password',
             password_confirmation: 'password',
             ideal_sleeping_hours: 8.00,
             profile: '自称、睡眠の神。よく寝むることで、みんなのQuality of Lifeが劇的に向上することを信じている。',
             avatar_url: "https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_girl.png",
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
             avatar_url: "https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_cat.png",
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
             avatar_url: "https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_sheep.png",
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
             avatar_url: "https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_rabbit.png",
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
             avatar_url: "https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_milk.png",
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
             avatar_url: "https://s3.ap-northeast-1.amazonaws.com/s3.sleepingdebtplan.com/avatar/avatar_orange",
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
first_user.microposts.create!(content: '初投稿。') 
second_user.microposts.create!(content: '理想睡眠時間を守って睡眠していきたいと思いまーす!') 
third_user.microposts.create!(content: '睡眠時間を確保するとここに宣言') 
forth_user.microposts.create!(content: 'まずは自分の睡眠状態を把握することから始める。') 
fifth_user.microposts.create!(content: 'ゲームをして昨夜は深夜2時に就寝。翌朝の目覚めは好調。') 
sixth_user.microposts.create!(content: 'これから睡眠管理していきます') 

first_user.microposts.create!(content: 'みんな色々な投稿していて面白い。') 
second_user.microposts.create!(content: '睡眠時間守れてる！さすが私！') 
third_user.microposts.create!(content: 'お風呂は寝る1時間前がベスト。お風呂上がりの体内深部が下がると副交感神経が優位になって眠りやすくなるため') 
forth_user.microposts.create!(content: '見える化すると思ったより自分の睡眠時間が少ないのがわかるな...') 
fifth_user.microposts.create!(content: 'ゲームをして昨夜は深夜4時に就寝。FPSは興奮してダメだね。') 
sixth_user.microposts.create!(content: '睡眠時間や感情の見える化はいいですね。直感的に把握しやすく、楽しく記録できるので！') 

first_user.microposts.create!(content: 'SleepMaster相澤さんの情報は役に立ってます。今後も参考にしたいですな。') 
second_user.microposts.create!(content: '油断すると夜更かしし減っちゃうなー') 
third_user.microposts.create!(content: '快眠のためには寝室内の温度より湿度が大切。湿度50%前後を目指そう') 
forth_user.microposts.create!(content: '寝起きで絶好調な時もほぼなし...よく眠るように努力しよう') 
fifth_user.microposts.create!(content: '昼間疲れたので昨夜は深夜0時に就寝。翌朝の目覚めは絶好調。') 
sixth_user.microposts.create!(content: '継続して睡眠日記を書くこと達成中。継続は力なり') 

first_user.microposts.create!(content: 'ショートスリーパーさんは睡眠時間少ないのに、体調良いのが羨ましい。') 
second_user.microposts.create!(content: 'SleepMaster相澤さんすごいな！きっちり睡眠時間確保している。私も頑張ろう！！') 
third_user.microposts.create!(content: '低反発マクラを初めて購入。使ってみるの待ちきれない') 
forth_user.microposts.create!(content: 'お風呂は寝る1時間前に入るのがいい試してみよう') 
fifth_user.microposts.create!(content: '漫画にハマり昨夜は深夜3時に就寝。呪術廻戦最高。') 
sixth_user.microposts.create!(content: '睡眠時間が低い日はやっぱり不調な時が多いみたいです...睡眠時間の大切さが改めてわかりますね') 

first_user.microposts.create!(content: 'よく寝る子さんの睡眠グラフは面白い。安定していい睡眠を確保してほしい。') 
second_user.microposts.create!(content: 'わたしのグラフ山あり谷ありだ') 
third_user.microposts.create!(content: '初日はいい感じ。しばらく使って寝心地を確かめてみる') 
forth_user.microposts.create!(content: 'たしかにいつもより早く寝ることができた気がする。これからも続けてみよう') 
fifth_user.microposts.create!(content: '漫画を読み昨夜は深夜2時に就寝。呪術廻戦が止まらない。') 
sixth_user.microposts.create!(content: 'もう少しで睡眠負債がなくなるので、誘惑に負けずに早寝を目指す！！') 

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

sixth_user.follow(first_user)
sixth_user.follow(second_user)
sixth_user.follow(third_user)
sixth_user.follow(forth_user)
sixth_user.follow(fifth_user)
sixth_user.follow(seventh_user)
sixth_user.follow(eighth_user)

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
first_user.diaries.create( date: '2022-01-01', sleeping_hours: 8.0, feeling: 'neutral_face' )
first_user.diaries.create( date: '2022-01-02', sleeping_hours: 7.5, feeling: 'neutral_face' )
first_user.diaries.create( date: '2022-01-03', sleeping_hours: 9.0, feeling: 'satisfied' )
first_user.diaries.create( date: '2022-01-04', sleeping_hours: 7.0, feeling: 'dizzy_face' )
first_user.diaries.create( date: '2022-01-05', sleeping_hours: 7.0, feeling: 'dizzy_face' )
first_user.diaries.create( date: '2022-01-06', sleeping_hours: 8.5, feeling: 'neutral_face' )
first_user.diaries.create( date: '2022-01-07', sleeping_hours: 8.5, feeling: 'neutral_face' )
first_user.diaries.create( date: '2022-01-08', sleeping_hours: 8.5, feeling: 'satisfied' )
first_user.diaries.create( date: '2022-01-09', sleeping_hours: 7.0, feeling: 'neutral_face' )
first_user.diaries.create( date: '2022-01-10', sleeping_hours: 8.0, feeling: 'satisfied' )
first_user.diaries.create( date: '2022-01-11', sleeping_hours: 8.5, feeling: 'satisfied' )
first_user.diaries.create( date: '2022-01-12', sleeping_hours: 8.5, feeling: 'satisfied' )

second_user.diaries.create( date: '2022-01-01', sleeping_hours: 8.0, feeling: 'neutral_face' )
second_user.diaries.create( date: '2022-01-02', sleeping_hours: 10 , feeling: 'satisfied' )
second_user.diaries.create( date: '2022-01-03', sleeping_hours: 6.0, feeling: 'dizzy_face' )
second_user.diaries.create( date: '2022-01-04', sleeping_hours: 8.0, feeling: 'neutral_face' )
second_user.diaries.create( date: '2022-01-05', sleeping_hours: 7.5, feeling: 'neutral_face' )
second_user.diaries.create( date: '2022-01-06', sleeping_hours: 8.0, feeling: 'satisfied' )
second_user.diaries.create( date: '2022-01-07', sleeping_hours: 5.0, feeling: 'dizzy_face' )
second_user.diaries.create( date: '2022-01-08', sleeping_hours: 6.0, feeling: 'dizzy_face' )
second_user.diaries.create( date: '2022-01-09', sleeping_hours: 9.0, feeling: 'neutral_face' )
second_user.diaries.create( date: '2022-01-10', sleeping_hours: 5.5, feeling: 'dizzy_face' )
second_user.diaries.create( date: '2022-01-11', sleeping_hours: 9.5, feeling: 'neutral_face' )
second_user.diaries.create( date: '2022-01-12', sleeping_hours: 8.0, feeling: 'satisfied' )

third_user.diaries.create( date: '2022-01-01', sleeping_hours: 8.0, feeling: 'satisfied' )
third_user.diaries.create( date: '2022-01-02', sleeping_hours: 7.5, feeling: 'satisfied' )
third_user.diaries.create( date: '2022-01-03', sleeping_hours: 7.5, feeling: 'neutral_face' )
third_user.diaries.create( date: '2022-01-04', sleeping_hours: 7.5, feeling: 'satisfied' )
third_user.diaries.create( date: '2022-01-05', sleeping_hours: 7.0, feeling: 'neutral_face')
third_user.diaries.create( date: '2022-01-06', sleeping_hours: 8.0, feeling: 'neutral_face')
third_user.diaries.create( date: '2022-01-07', sleeping_hours: 7.5, feeling: 'satisfied' )
third_user.diaries.create( date: '2022-01-08', sleeping_hours: 9.0, feeling: 'satisfied' )
third_user.diaries.create( date: '2022-01-09', sleeping_hours: 7.0, feeling: 'neutral_face' )
third_user.diaries.create( date: '2022-01-10', sleeping_hours: 7.5, feeling: 'neutral_face' )
third_user.diaries.create( date: '2022-01-11', sleeping_hours: 8.0, feeling: 'satisfied' )
third_user.diaries.create( date: '2022-01-12', sleeping_hours: 8.0, feeling: 'satisfied' )

forth_user.diaries.create( date: '2022-01-01', sleeping_hours: 7.5, feeling: 'neutral_face' )
forth_user.diaries.create( date: '2022-01-02', sleeping_hours: 7.0, feeling: 'neutral_face' )
forth_user.diaries.create( date: '2022-01-03', sleeping_hours: 6.0, feeling: 'dizzy_face' )
forth_user.diaries.create( date: '2022-01-04', sleeping_hours: 6.5, feeling: 'dizzy_face' )
forth_user.diaries.create( date: '2022-01-05', sleeping_hours: 5.5, feeling: 'dizzy_face' )
forth_user.diaries.create( date: '2022-01-06', sleeping_hours: 6.0, feeling: 'neutral_face' )
forth_user.diaries.create( date: '2022-01-07', sleeping_hours: 5.0, feeling: 'dizzy_face' )
forth_user.diaries.create( date: '2022-01-08', sleeping_hours: 5.5, feeling: 'dizzy_face' )
forth_user.diaries.create( date: '2022-01-09', sleeping_hours: 7.0, feeling: 'neutral_face' )
forth_user.diaries.create( date: '2022-01-10', sleeping_hours: 7.5, feeling: 'satisfied' )
forth_user.diaries.create( date: '2022-01-11', sleeping_hours: 6.0, feeling: 'neutral_face' )
forth_user.diaries.create( date: '2022-01-12', sleeping_hours: 6.5, feeling: 'dizzy_face' )

fifth_user.diaries.create( date: '2022-01-08', sleeping_hours: 5.0, feeling: 'satisfied' )
fifth_user.diaries.create( date: '2022-01-09', sleeping_hours: 3.0, feeling: 'neutral_face')
fifth_user.diaries.create( date: '2022-01-10', sleeping_hours: 6.0, feeling: 'satisfied' )
fifth_user.diaries.create( date: '2022-01-11', sleeping_hours: 4.0, feeling: 'satisfied' )
fifth_user.diaries.create( date: '2022-01-12', sleeping_hours: 5.0, feeling: 'satisfied' )

sixth_user.diaries.create( date: '2022-01-01', sleeping_hours: 7.5, feeling: 'neutral_face' )
sixth_user.diaries.create( date: '2022-01-02', sleeping_hours: 8.0, feeling: 'satisfied' )
sixth_user.diaries.create( date: '2022-01-03', sleeping_hours: 6.0, feeling: 'dizzy_face' )
sixth_user.diaries.create( date: '2022-01-04', sleeping_hours: 7.5, feeling: 'neutral_face' )
sixth_user.diaries.create( date: '2022-01-05', sleeping_hours: 7.0, feeling: 'neutral_face' )
sixth_user.diaries.create( date: '2022-01-06', sleeping_hours: 6.0, feeling: 'dizzy_face' )
sixth_user.diaries.create( date: '2022-01-07', sleeping_hours: 7.0, feeling: 'dizzy_face' )
sixth_user.diaries.create( date: '2022-01-08', sleeping_hours: 8.0, feeling: 'neutral_face' )
sixth_user.diaries.create( date: '2022-01-09', sleeping_hours: 7.5, feeling: 'neutral_face' )
sixth_user.diaries.create( date: '2022-01-10', sleeping_hours: 8.0, feeling: 'neutral_face' )
sixth_user.diaries.create( date: '2022-01-11', sleeping_hours: 8.0, feeling: 'satisfied' )
sixth_user.diaries.create( date: '2022-01-12', sleeping_hours: 8.0, feeling: 'satisfied' )

seventh_user.diaries.create( date: '2022-01-07', sleeping_hours: 8.0, feeling: 'neutral_face' )
seventh_user.diaries.create( date: '2022-01-08', sleeping_hours: 9.0, feeling: 'neutral_face' )
seventh_user.diaries.create( date: '2022-01-09', sleeping_hours: 9.0, feeling: 'satisfied' )
seventh_user.diaries.create( date: '2022-01-10', sleeping_hours: 8.5, feeling: 'satisfied' )
seventh_user.diaries.create( date: '2022-01-11', sleeping_hours: 8.0, feeling: 'satisfied' )
seventh_user.diaries.create( date: '2022-01-12', sleeping_hours: 7.5, feeling: 'neutral_face' )

eighth_user.diaries.create( date: '2022-01-07', sleeping_hours: 8.0, feeling: 'satisfied' )
eighth_user.diaries.create( date: '2022-01-08', sleeping_hours: 5.5, feeling: 'neutral_face' )
eighth_user.diaries.create( date: '2022-01-09', sleeping_hours: 7.5, feeling: 'neutral_face' )
eighth_user.diaries.create( date: '2022-01-10', sleeping_hours: 6.0, feeling: 'dizzy_face' )
eighth_user.diaries.create( date: '2022-01-11', sleeping_hours: 8.0, feeling: 'neutral_face' )
eighth_user.diaries.create( date: '2022-01-12', sleeping_hours: 6.0, feeling: 'dizzy_face' )
