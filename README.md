# 睡眠補完計画
「睡眠負債を見える化」した睡眠管理アプリケーションです。  
継続して睡眠時間を確保できない人を対象として、睡眠状況の記録、睡眠ノウハウの共有、睡眠モチベーションの向上を狙っております。

URL    : https://sleepingdebtplan.com
GitHub : https://github.com/trunkman/sleepingdebtplan
※ ゲストアカウントから試しログイン可能です
※ 推奨ブラウザChorome(PC版)となります

## インフラ構成図
![20220110_インフラ構成図](https://user-images.githubusercontent.com/90957668/148768368-f4140c59-dc9a-4c10-8fe2-da0e18c13ee7.jpg)

## ER図
![20220110_ER図](https://user-images.githubusercontent.com/90957668/148768450-26155513-0cd5-45ab-812e-a5d2f6507c19.png)

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
* MySQL (5.7)
* AWS
  * ALB
  * Certificate Manager
  * CloudFront
  * VPC (Public subnet, Private subnet)
  * ECR
  * ECS
  * Fargate
  * Public subnet
  * Private subnet
  * RDS (MySQL)
  * Route53
  * S3
* Docker/Docer-compose
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

## 今後取り組みたいこと
* Twitter連携機能
* レスポンシブ対応
