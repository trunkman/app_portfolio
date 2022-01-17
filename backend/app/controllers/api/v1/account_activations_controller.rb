# frozen_string_literal: true

module Api
  module V1
    class AccountActivationsController < ApplicationController
      def edit
        user = User.find_by(email: params[:email])
        if user
          user.activate
          log_in user
          render json: { logged_in: true, user: user },
                 status: :create
        else
          render json: { errors: user.errors.full_messages },
                 status: :unprocessable_entity
        end
      end
    end
  end
end
