module Api
  module V1
    class BooksController < ApplicationController
      def search
        @books = RakutenWebService::Books::Book.search(title: params[:book][:title])
        render json: { books: @books }, status: :ok
      end

      def show
        @book = RakutenWebService::Books::Book.search(isbn: params[:id])
        if Book.find_by(isbn: params[:id])
          @registration = true
        end
        render json: { book: @book, registration: @registration },
               status: :ok
      end

      def create
        @book = Book.new(title:          params[:book][:title],
                          auther:         params[:book][:auther],
                          publisher_name:   params[:book][:publisherName],
                          sales_date:     params[:book][:salesDate],
                          item_price:     params[:book][:itemPrice],
                          item_url:       params[:book][:itemUrl],
                          item_caption:   params[:book][:itemCaption],
                          image_url:      params[:book][:largeImageUrl],
                          isbn:           params[:book][:isbn],
                          review_count:   params[:book][:reviewCount],
                          review_average: params[:book][:reviewAverage]
                          )
        # すでにDBに登録している本であるかを判断 
        if Book.find_by(title: params[:book][:title]).nil?
          @book.save!
        end
        @subscription = Subscription.new(user_id: current_user.id,
                                         book_id: @book.id,
                                         read:    params[:book][:read]
                                        )
        # すでにユーザーが登録している本であるか判断
        if Subscription.find_by(user_id: current_user.id, book_id: @book.id).nil?
          @subscription.save!
        else
          @subscription = Subscription.find_by(user_id: current_user.id, book_id: @book.id)
          @subscription.update(read: params[:book][:read])
          @message = @subscription.read ? 'すでに読了している本です。' : 'いま積んでいる本です。'
        end
        render json: {subscription: @subscription, message: @message},
               status: :ok
      end

      # def update
      #   if @book = Book.find_by(isbn: params[:id])
      #     @book.update(title:          book.title,
      #                   auther:         book.author,
      #                   puliser_name:   book.publisherName
      #                   sales_date:     book.salesDate
      #                   item_price:     book.itemPrice
      #                   item_url:       book.itemUrl
      #                   item_caption:   book.itemCaption
      #                   image_url:      book.largeImageUrl
      #                   isbn:           book.isbn
      #                   review_count:   book.reviewCount
      #                   review_average: book.reviewAverage
      #     ) 
      #     render json: { isbn: @book.isbn },
      #     status: :no_content
      #   else
      #     render json: { errors: @book.errors.full_messages },
      #            status: :unprocessable_entity
      #   end
      # end

    end
  end
end
