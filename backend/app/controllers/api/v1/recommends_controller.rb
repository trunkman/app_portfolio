module Api
  module V1
    class RecommendsController < ApplicationController
      before_action :logged_in_user, only: %i[create destroy]

      def create
        @recommend = current_user.build_recommend(book_id: params[:recommend][:book_id])
        if @recommend.save
          @book = current_user.recommend_book
          render json: { book: @book },
                 status: :created
        else
          render json: { message: 'おすすめ本の登録ができませんでした' },
                 status: :unprocessable_entity
        end
      end

      def destroy
        @recommend = Recommend.find_by(user_id: current_user.id, book_id: params[:id])
        @recommend.destroy
        render json: { message: 'おすすめ本を削除しました' },
               status: :ok
      end

    end
  end
end
