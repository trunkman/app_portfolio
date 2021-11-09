class CreateDiaries < ActiveRecord::Migration[6.1]
  def change
    create_table :diaries do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :sleeping_hours
      t.string :feeling
      t.datetime :start_time

      t.timestamps
    end
  end
end
