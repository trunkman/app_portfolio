class Api::V1::AccountActivationsController < ApplicationController
  def edit
    user = User.find_by(email: params[:email])
    if user && !user.activated? && user.authenticated(:activation, params[:id])
      user.activate
      log_in user
      render json: { logged_in: true, user: user },
             status: :ok
    else
      render json: { errors: user.errors.full_messages },
             status: :unprocessable_entity
    end
  end
end
