# frozen_string_literal: true

module Api
  module V1
    class RecommendsController < ApplicationController
      before_action :logged_in_user, only: %i[create destroy]

      # ユーザーのおすすめ本に登録する
      def create
        @book = Book.find_by(isbn: params[:recommend][:book_isbn])
        @recommend = current_user.build_recommend(book_id: @book.id)
        if @recommend.save
          @book = current_user.recommend_book
          render json: { message: '私のおすすめ睡眠本に登録しました' },
                 status: :created
        else
          render json: { message: 'おすすめ本の登録ができませんでした' },
                 status: :unprocessable_entity
        end
      end

      # ユーザーのおすすめ本を解除する
      def destroy
        @recommend = Recommend.find_by(user_id: current_user.id, book_id: params[:id])
        @recommend.destroy
        render json: { message: 'おすすめ本を削除しました' },
               status: :ok
      end
    end
  end
end
