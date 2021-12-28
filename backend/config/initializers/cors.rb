# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'sleepingdebtplan.com', 'sleepingdebtplan.com:3001', 'sleepingdebtplan.com:8000'
    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             credentials: true
  end
end
