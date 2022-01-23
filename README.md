# 睡眠補完計画 (ポートフォリオ)
**睡眠時間確保のための睡眠管理アプリケーションです。**  
**”フォグ式消費者行動モデル”の理論に基づいて、睡眠時間確保をサポートします。**

<img width="1160" alt="AppImage" src="https://user-images.githubusercontent.com/90957668/149050562-6bf19abe-3925-4357-80d5-1e8b193d8880.png">

### URL : https://sleepingdebtplan.com  
※ ゲストアカウントから簡単にログイン可能です  
※ 推奨: デバイス：PC、ブラウザ：Google Chorome  

## 使用技術
### フロントエンド
* React (5.0.0)
* Node.js (v14.18.0)
* Nginx (1.20.2)
* Materi-UI
### バックエンド
* Ruby (3.0.2)
* Ruby on Rails (6.1.4.1)
* Puma (5.4.0)
* Rspec
* Rubocop
### インフラ・その他
* AWS (ALB, Certificate Manager, CloudFront, ECR, ECS, Fargate, NAT Gateway, Public subnet, Private subnet, RDS, Route53, S3, VPC, WAF)
* Docker / Docer-compose
* CircleCI (自動ビルド, 自動テスト, 自動デプロイ)

## インフラ構成図
![20220122-インフラ構成図](https://user-images.githubusercontent.com/90957668/150514947-7e575f46-a9dd-454d-9731-abb7df472265.jpg)

## ER図
![20220110-ER図](https://user-images.githubusercontent.com/90957668/148783446-e9d86abf-6584-4ec1-9dfe-b061938bd203.jpg)

## 機能一覧
* 新規登録機能
* ログイン機能
* ゲストユーザー機能
* 自動ログイン(Remember me)機能
* メール認証機能
* パスワード再設定機能
* 投稿機能
  * 画像投稿(S3)
  * 投稿一覧機能(フォローユーザー&自己)
  * 自己投稿一覧機能
* いいね機能
  * 自己いいね一覧機能
* コメント機能
  * コメント数表示機能
  * 自己コメント一覧機能
* フォロー機能
* ダイレクトメッセージ機能
* 日記機能
  * カレンダー表示機能
  * 絵文字表示機能 
  * グラフ表示機能(Recharts)
* 書籍検索機能(楽天ブックス書籍検索API)
  * 無限スクロール機能(react-infinite-scroller)
* おすすめ本登録機能
* ランキング機能
  * 平均睡眠時間
  * 睡眠本読書数
  * 人気の読了本
  * 人気の積読本
* 通知機能
  * いいね通知
  * コメント通知
  * フォロー通知
  * トークルーム作成通知
  * 未読メッセージ通知
* レスポンシブ対応

## 画面遷移図
![20220121-画面遷移図](https://user-images.githubusercontent.com/90957668/150514937-22d54542-bd28-4ac6-b505-7e38c48f3576.jpg)

## テスト
* Rspec/FactoryBot
  * 単体テスト(正常系、異常系)
  * 統合テスト

## 今後改善すべき点
* E2Eテストの導入
* Terraformによるインフラのコード化
