# 睡眠補完計画
人間の行動モデルに基づいた睡眠管理アプリケーションです。  
睡眠の質が悪い、睡眠時間が確保できないなど悩んでいる人々を対象とし、良質な睡眠ができるように3つのポイントを意識して睡眠を管理していきます。
* 目標(睡眠負債)や記録を直感的にわかりやすく
* 高評価の睡眠本が共有され、睡眠の大切さの理解を促進
* チャット機能でお互いに睡眠の質を高め合う

## 使用技術
### フロントエンド
* React (?)
* Node.js
* Materi-UI
* 楽天ブックス書籍検索API
### バックエンド
* Ruby (3.0.2)
* Ruby on Rails (6.1.4.1)
* Rspec
* FactoryBot
* Rubocop
### インフラ等
* NGINX (?)
* Puma (5.4.0)
* MySQL (5.7)
* AWS
  * ALB
  * Certificate Manager
  * CloudFront
  * VPC
  * EC2
  * ECR
  * Public subnet
  * Private subnet
  * RDS
  * Route53
  * S3
* Docker/Docer-compose
* CircleCI

## インフラ構成図
![20211229_インフラ構成図](https://user-images.githubusercontent.com/90957668/146661421-4da6f5f5-7d4a-47a4-8302-c0d9f9e74ab5.jpg)

## 機能一覧
* 新規登録機能
* ログイン機能
* 自動ログイン(Remember me)機能
* メール認証機能
* パスワード再設定機能
* 投稿機能
  * 画像投稿(S3)
* いいね機能
* コメント機能
* フォロー機能
* ダイレクトメッセージ機能
* 日記機能
  * カレンダー表示機能
  * 絵文字表示機能 
  * グラフ表示機能(Recharts)
* 書籍検索機能(楽天ブックス書籍検索API)
* おすすめ本登録機能
* ランキング機能
  * 平均睡眠時間
  * 睡眠本読書数
  * 人気の読了本
  * 人気の積読本
* 通知機能
  * いいね、コメント、トークルーム作成通知
  * 未読メッセージ通知

## ER図
![20211229_ER図](https://user-images.githubusercontent.com/90957668/146661415-cb1e3fc6-d5d1-4e30-8f60-1346fb1a4365.jpg)

## テスト
* Rspec/FactoryBot
  * 単体テスト(正常系、異常系)
  * 統合テスト
