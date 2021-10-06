class ApplicationController < ActionController::API
  include SessionsHelper

  private

  def logged_in_user
    unless logged_in?
      store_location
      redirect_to api_v1_login_url
    end
  end
end
