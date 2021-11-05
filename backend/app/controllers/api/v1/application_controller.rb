module Api
  module V1
    class ApplicationController < ActionController::API
      include ActionController::Cookies
      include SessionsHelper

      private

      # ログイン済みユーザーがどうか確認
      def logged_in_user
        unless logged_in?
          render json: { message: '未ログイン'}, status: :unauthorized
        end
      end
    end
  end
end
