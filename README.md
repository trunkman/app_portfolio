# 睡眠補完計画
**「睡眠負債を見える化」した睡眠管理アプリケーションです。**  
**継続した睡眠時間を確保できない人を対象として、睡眠状況の記録、睡眠ノウハウの共有、睡眠モチベーションの向上を狙います。**

URL: https://sleepingdebtplan.com  
※ ゲストアカウントから試しログイン可能です  
※ 推奨: PC & ブラウザChoromeとなります  

## インフラ構成図
![20220110-インフラ構成図](https://user-images.githubusercontent.com/90957668/148783455-64854cfb-e4af-4861-96f5-eb3af32406ae.jpg)

## ER図
![20220110-ER図](https://user-images.githubusercontent.com/90957668/148783446-e9d86abf-6584-4ec1-9dfe-b061938bd203.jpg)

## 使用技術
### フロントエンド
* React (5.0.0)
* Node.js (v14.18.0)
* NGINX (1.20.2)
* Materi-UI
* 楽天ブックス書籍検索API
### バックエンド
* Ruby (3.0.2)
* Ruby on Rails (6.1.4.1)
* Puma (5.4.0)
* Rspec
* FactoryBot
* Rubocop
### インフラ・その他
* AWS
  * ALB
  * Certificate Manager
  * CloudFront
  * VPC
  * ECR
  * ECS
  * Fargate
  * Public subnet
  * Private subnet
  * RDS (MySQL)
  * Route53
  * S3
* Docker / Docer-compose
* CircleCI
  * CI (自動ビルド, 自動テスト)
  * CD (自動デプロイ)

## 機能一覧
* 新規登録機能
* ログイン機能
* ゲストユーザー機能
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
  * 無限スクロール機能
* おすすめ本登録機能
* ランキング機能
  * 平均睡眠時間
  * 睡眠本読書数
  * 人気の読了本
  * 人気の積読本
* 通知機能
  * いいね、コメント、トークルーム作成通知
  * 未読メッセージ通知

## テスト
* Rspec/FactoryBot
  * 単体テスト(正常系、異常系)
  * 統合テスト

## 今後改善すべき点
* レスポンシブ対応
* Twitter連携機能の導入
* E2Eテストの導入
* Terraformによるインフラのコード化
