# frozen_string_literal: true

class AddAvatarToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :avatar_url, :text
  end
end
