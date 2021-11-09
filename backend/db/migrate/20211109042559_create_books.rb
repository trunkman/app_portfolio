class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :auther
      t.string :publisher_name
      t.string :sales_date
      t.integer :item_price
      t.text :item_url
      t.text :item_caption
      t.text :image_url
      t.string :isbn
      t.integer :review_count
      t.string :review_average

      t.timestamps
    end
  end
end
