module Api
  module V1
    class BooksController < ApplicationController
      def search
        @books = RakutenWebService::Books::Book.search(title: params[:book][:title])
        render json: { books: @books }, status: :ok
      end

      def show
        @book = RakutenWebService::Books::Book.search(isbn: params[:id])
        render json: { book: @book }, status: :ok
      end

      def create

      end

      private

      # Strong Parameters
      def book_params
        params.require(:book).permit(:keyword)
      end

    end
  end
end
