# frozen_string_literal: true

RakutenWebService.configure do |c|
  # アプリケーションID
  c.application_id = ENV['RWS_APPLICATION_ID']
  # 楽天アフィリエイトID
  c.affiliate_id = ENV['RWS_AFFILIATION_ID']
  # リクエストのリトライ回数
  c.max_retries = 3 # default: 5
  # デバッグモード
  c.debug = true # default: false
end
