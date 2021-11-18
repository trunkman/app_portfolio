# frozen_string_literal: true

if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store,
                                         key: '_auth-app-api',
                                         domain: 'http://54.250.110.27'
else
  Rails.application.config.session_store :cookie_store,
                                         key: '_auth-app-api'

end
