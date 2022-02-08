# 睡眠補完計画 (ポートフォリオ)
**睡眠時間を確保するための睡眠管理WEBサービスです。**  
**”フォグ式消費者行動モデル”の理論に基づいて、睡眠時間確保をサポートします。**

<img width="1153" alt="スクリーンショット 2022-01-25 23 34 09" src="https://user-images.githubusercontent.com/90957668/150996789-0c69c181-ceda-4c64-abf4-7e3107aee9dd.png">

### URL : https://sleepingdebtplan.com  
※ ゲストアカウントから簡単にログイン可能です  
※ 推奨: デバイス：PC、ブラウザ：Google Chorome  

## 使用技術
### フロントエンド
* React (5.0.0)
* Node.js (v14.18.0)
* Nginx (1.20.2)
* Material-UI
### バックエンド
* Ruby (3.0.2)
* Ruby on Rails (6.1.4.1)
* Puma (5.4.0)
* Rspec
* Rubocop
### インフラ・その他
* AWS (ALB, Certificate Manager, CloudFront, EC2, ECR, ECS, Fargate, NAT Gateway, Public subnet, Private subnet, RDS (MySQL), Route53, S3, VPC, WAF)
* Docker / Docker-compose
* CircleCI (自動テスト, 自動ビルド, 自動デプロイ)

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
* パスワード再設定機能 (メール送信)
* アカウント削除機能（管理者＆自己のみ）
* 投稿機能
  * 画像投稿 (S3)
* いいね機能
* コメント機能
  * コメント数表示機能
* フォロー機能
* タイムライン機能 (フォローユーザー＆自己)
* ダイレクトメッセージ機能
* 日記投稿機能
  * カレンダー表示機能
  * 絵文字表示機能 (EmojiMart)
  * グラフ表示機能(Recharts)
* 書籍検索機能 (楽天ブックス書籍検索API)
  * 無限スクロール機能 (react-infinite-scroller)
* おすすめ本登録機能
* ランキング機能
  * ユーザー平均睡眠時間
  * ユーザー睡眠本読書数
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
![20220125-画面遷移図](https://user-images.githubusercontent.com/90957668/150994957-6c180b6d-e018-490d-9a55-2d31922e16d2.jpg)

## テスト
* Rspec/FactoryBot (正常系、異常系)
  * 単体テスト
  * 統合テスト

## 今後改善すべき点
* TypeScriptの導入
* E2Eテストの導入
* Terraformによるインフラのコード化
