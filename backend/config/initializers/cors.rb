# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'sleepingdebtplan.com',
            'test.sleepingdebtplan.com',
            'localhost', 'localhost:80', 'localhost:8000'
    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             credentials: true
  end
end
