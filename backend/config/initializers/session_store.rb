Rails.application.config.session_store :cookie_store, key: '_auth-app-api', domain: 'http://54.250.110.27:3001'

# if Rails.env === 'production'
# else
#   Rails.application.config.session_store :cookie_store, key: '_auth-app-api'
# end
