# frozen_string_literal: true

module Api
  module V1
    class BooksController < ApplicationController
      before_action :logged_in_user, only: %i[show create update]

      # 本詳細ページを表示する
      def show
        @book = Book.find_by(isbn: params[:id])
        # DBに本が登録されている場合、registrationをtureで返す
        unless @book.nil?
          registration = true
          @subscription = Subscription.find_by(user_id: current_user.id, book_id: @book.id)
          # ユーザーが登録している場合、subscribedをtrueで返す
          subscribed = true unless @subscription.nil?
        end
        @book = RakutenWebService::Books::Book.search(isbn: params[:id])
        render json: { book: @book, registration: registration, subscribed: subscribed },
               status: :ok
      end

      # 本を登録する
      def create
        # DBに本が登録されているかを判定
        if params[:registration].nil?
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
          @book.save!
        else
          @book = Book.find_by(isbn: params[:book][:isbn])
        end
        # 中間テーブルを作成
        @subscription = Subscription.create(user_id: current_user.id,
                                            book_id: @book.id,
                                            read: params[:read])
        message = @subscription.read ? '読了本に追加しました。' : '積読本に追加しました。'
        render json: { subscription: @subscription, message: message },
               status: :created
      end

      # 本の読了・積読情報を更新する
      def update
        book_id = Book.find_by(isbn: params[:id]).id
        @subscription = Subscription.find_by(user_id: current_user.id, book_id: book_id)
        @subscription.update(read: params[:read])
        message = @subscription.read ? 'この本は読了本です。' : 'この本は積読本です。'
        render json: { subscription: @subscription, message: message },
               status: :ok
      end

      # 本の検索結果を返す
      def search
        @books = RakutenWebService::Books::Book.search(title: params[:book][:title],
                                                       page: params[:book][:page],
                                                       hits: 24)
        if @books.nil?
          render json: { message: '検索に引っかかる本がありませんでした' },
                 status: :ok
        else
          render json: { books: @books },
                 status: :ok
        end
      end
    end
  end
end
