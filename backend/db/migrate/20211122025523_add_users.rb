class AddUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :profile, :string
    add_column :users, :ideal_sleeping_hours, :float
  end
end
