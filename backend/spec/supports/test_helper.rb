# frozen_string_literal: true

module TestHelpers
  def json
    JSON.parse(response.body)
  end

  def log_in_as(user)
    post api_v1_login_path, params: { session: { email: user['email'],
                                                 password: 'foobar' } }
  end
end
