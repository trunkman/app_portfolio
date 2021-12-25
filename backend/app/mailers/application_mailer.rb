# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: ENV['HOST_MAIL']
  layout 'mailer'
end
