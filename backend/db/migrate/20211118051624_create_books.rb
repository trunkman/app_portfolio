# frozen_string_literal: true

class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :publisherName
      t.string :salesDate
      t.integer :itemPrice
      t.text :itemUrl
      t.text :itemCaption
      t.text :largeImageUrl
      t.string :isbn
      t.integer :reviewCount
      t.string :reviewAverage

      t.timestamps
    end
  end
end
