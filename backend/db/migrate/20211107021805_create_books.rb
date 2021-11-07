class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :auther
      t.string :publiser_name

      t.timestamps
    end
  end
end
