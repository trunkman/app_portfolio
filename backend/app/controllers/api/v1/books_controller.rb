# frozen_string_literal: true

module Api
  module V1
    class BooksController < ApplicationController
      before_action :logged_in_user, only: %i[show create update]
      before_action :get_book,       only: %i[show update]

      # 本詳細ページを表示する
      def show
        # DBに本が登録されている場合、registrationをtureで返す
        unless @book.blank?
          registration = true
          @subscription = Subscription.find_by(user_id: current_user.id, book_id: @book.id)
          # ユーザーが登録している場合、subscribedをtrueで返す
          subscribed = true unless @subscription.blank?
        end
        @book = RakutenWebService::Books::Book.search(isbn: params[:id])
        render json: { book: @book, registration: registration, subscribed: subscribed },
               status: :ok
      end

      # 本を登録する
      def create
        # DBに本が登録されていない場合、DBに登録する
        if params[:registration].blank?
          book_registration(params[:book])
        else
          @book = Book.find_by(isbn: params[:book][:isbn])
        end
        # 中間テーブルを作成
        @subscription = Subscription.create(user_id: current_user.id,
                                            book_id: @book.id,
                                            read: params[:read])
        render json: { subscription: @subscription},
               status: :created
      end

      # 本の読了・積読情報を更新する
      def update
        @subscription = Subscription.find_by(user_id: current_user.id, book_id: @book.id)
        @subscription.update(read: params[:read])
        render json: { subscription: @subscription },
               status: :ok
      end

      # 本の検索結果を返す
      def search
        @books = RakutenWebService::Books::Book.search(title: params[:book][:title],
                                                       page: params[:book][:page],
                                                       hits: 24)
        if @books.blank?
          render json: { message: '検索に引っかかる本がありませんでした' },
                 status: :ok
        else
          render json: { books: @books },
                 status: :ok
        end
      end

      private

        def get_book 
          @book = Book.find_by(isbn: params[:id])
        end

        def book_registration(book_params)
          @book = Book.new(title: book_params[:title],
                            author: book_params[:author],
                            publisherName: book_params[:publisherName],
                            salesDate: book_params[:salesDate],
                            itemPrice: book_params[:itemPrice],
                            itemUrl: book_params[:itemUrl],
                            itemCaption: book_params[:itemCaption],
                            largeImageUrl: book_params[:largeImageUrl],
                            isbn: book_params[:isbn],
                            reviewCount: book_params[:reviewCount],
                            reviewAverage: book_params[:reviewAverage])
          @book.save!
        end
    end
  end
end
