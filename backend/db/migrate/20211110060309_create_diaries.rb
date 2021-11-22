# frozen_string_literal: true

class CreateDiaries < ActiveRecord::Migration[6.1]
  def change
    create_table :diaries do |t|
      t.references :user, null: false, foreign_key: true
      t.float :sleeping_hours
      t.string :feeling
      t.string :date

      t.timestamps
    end
  end
end
