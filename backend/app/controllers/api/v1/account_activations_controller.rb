# frozen_string_literal: true

module Api
  module V1
    class AccountActivationsController < ApplicationController
      before_action :user_exists,   only: [:edit]

      # アカウントを有効化する
      def edit
        user = User.find_by(email: params[:email])
        if user
          user.activate
          log_in user
          render json: { logged_in: true, user: user.civilized },
                 status: :create
        else
          render json: { errors: user.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      private

        def user_exists
          unless User.exists?(email: params[:email])
            render json: { errors: {message: 'このアカウントユーザーは存在しません'}},
            status: :forbidden
          end
        end

    end
  end
end
