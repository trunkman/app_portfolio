module Api
  module V1
    class ApplicationController < ActionController::API
      include ActionController::Cookies
      include SessionsHelper

      private

      # ログイン済みユーザーがどうか確認
      def logged_in_user
        unless logged_in?
          render json: {},
                 status: :unauthorized
        end
      end

      # 正しいユーザーかどうか確認
      def correct_user
        @user = User.find(params[:id])
        unless current_user?(@user)
          render json: {},
                 status: :unauthorized
        end
      end
    end
  end
end
