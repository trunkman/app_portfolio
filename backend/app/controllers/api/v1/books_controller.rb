# frozen_string_literal: true

module Api
  module V1
    class BooksController < ApplicationController
      def search
        @books = RakutenWebService::Books::Book.search(title: params[:book][:title])
        render json: { books: @books }, status: :ok
      end

      def show
        @book = Book.find_by(isbn: params[:id])
        # DBに本が登録されている場合、tureを返す
        unless @book.nil?
          registration = true
          @subscription = Subscription.find_by(user_id: current_user.id, book_id: @book.id)
          # すでにユーザー登録している本の場合、trueを返す
          subscribed = true unless @subscription.nil?
        end
        @book = RakutenWebService::Books::Book.search(isbn: params[:id])
        render json: { book: @book, registration: registration, subscribed: subscribed },
               status: :ok
      end

      def create
        @book = Book.new(title: params[:book][:title],
                         author: params[:book][:author],
                         publisherName: params[:book][:publisherName],
                         salesDate: params[:book][:salesDate],
                         itemPrice: params[:book][:itemPrice],
                         itemUrl: params[:book][:itemUrl],
                         itemCaption: params[:book][:itemCaption],
                         largeImageUrl: params[:book][:largeImageUrl],
                         isbn: params[:book][:isbn],
                         reviewCount: params[:book][:reviewCount],
                         reviewAverage: params[:book][:reviewAverage])
        registration = params[:registration]
        # DBに登録していない新規本であれば登録する
        @book.save! unless registration
        @subscription = Subscription.create(user_id: current_user.id,
                                            book_id: @book.id,
                                            read: params[:read])
        message = if @subscription.read
                    '読了本に追加しました。'
                  else
                    '積読本に追加しました。'
                  end
        render json: { subscription: @subscription, message: message },
               status: :ok
      end

      def update
        book_id = Book.find_by(isbn: params[:id]).id
        @subscription = Subscription.find_by(user_id: current_user.id, book_id: book_id)
        @subscription.update(read: params[:read])
        message = if @subscription.read
                    'この本は読了本です。'
                  else
                    'この本は積読本です。'
                  end
        render json: { subscription: @subscription, message: message },
               status: :ok
      end
    end
  end
end
