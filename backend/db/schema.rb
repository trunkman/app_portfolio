# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_211_122_083_645) do
  create_table 'books', force: :cascade do |t|
    t.string 'title'
    t.string 'author'
    t.string 'publisherName'
    t.string 'salesDate'
    t.integer 'itemPrice'
    t.text 'itemUrl'
    t.text 'itemCaption'
    t.text 'largeImageUrl'
    t.string 'isbn'
    t.integer 'reviewCount'
    t.string 'reviewAverage'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'comments', force: :cascade do |t|
    t.string 'content'
    t.integer 'user_id', null: false
    t.integer 'micropost_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['micropost_id'], name: 'index_comments_on_micropost_id'
    t.index ['user_id'], name: 'index_comments_on_user_id'
  end

  create_table 'diaries', force: :cascade do |t|
    t.integer 'user_id', null: false
    t.float 'sleeping_hours'
    t.string 'feeling'
    t.string 'date'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['user_id'], name: 'index_diaries_on_user_id'
  end

  create_table 'entries', force: :cascade do |t|
    t.integer 'user_id', null: false
    t.integer 'room_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['room_id'], name: 'index_entries_on_room_id'
    t.index ['user_id'], name: 'index_entries_on_user_id'
  end

  create_table 'likes', force: :cascade do |t|
    t.integer 'user_id', null: false
    t.integer 'micropost_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['micropost_id'], name: 'index_likes_on_micropost_id'
    t.index ['user_id'], name: 'index_likes_on_user_id'
  end

  create_table 'messages', force: :cascade do |t|
    t.string 'content'
    t.integer 'user_id', null: false
    t.integer 'room_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['room_id'], name: 'index_messages_on_room_id'
    t.index ['user_id'], name: 'index_messages_on_user_id'
  end

  create_table 'microposts', force: :cascade do |t|
    t.text 'content'
    t.integer 'user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[user_id created_at], name: 'index_microposts_on_user_id_and_created_at'
    t.index ['user_id'], name: 'index_microposts_on_user_id'
  end

  create_table 'notifications', force: :cascade do |t|
    t.integer 'visitor_id', null: false
    t.integer 'visited_id', null: false
    t.integer 'micropost_id'
    t.integer 'comment_id'
    t.integer 'entry_id'
    t.integer 'message_id'
    t.string 'action', default: '', null: false
    t.boolean 'checked', default: false, null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'recommends', force: :cascade do |t|
    t.integer 'user_id', null: false
    t.integer 'book_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['book_id'], name: 'index_recommends_on_book_id'
    t.index ['user_id'], name: 'index_recommends_on_user_id'
  end

  create_table 'relationships', force: :cascade do |t|
    t.integer 'follower_id'
    t.integer 'followed_id'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['followed_id'], name: 'index_relationships_on_followed_id'
    t.index %w[follower_id followed_id], name: 'index_relationships_on_follower_id_and_followed_id', unique: true
    t.index ['follower_id'], name: 'index_relationships_on_follower_id'
  end

  create_table 'rooms', force: :cascade do |t|
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'subscriptions', force: :cascade do |t|
    t.boolean 'read', default: false
    t.integer 'user_id', null: false
    t.integer 'book_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['book_id'], name: 'index_subscriptions_on_book_id'
    t.index ['user_id'], name: 'index_subscriptions_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'name'
    t.string 'email'
    t.string 'password_digest'
    t.string 'remember_digest'
    t.boolean 'admin', default: false
    t.string 'activation_digest'
    t.boolean 'activated', default: false
    t.datetime 'activated_at'
    t.string 'reset_digest'
    t.datetime 'reset_sent_at'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.string 'profile'
    t.float 'ideal_sleeping_hours'
    t.index ['email'], name: 'index_users_on_email', unique: true
  end

  add_foreign_key 'comments', 'microposts'
  add_foreign_key 'comments', 'users'
  add_foreign_key 'diaries', 'users'
  add_foreign_key 'entries', 'rooms'
  add_foreign_key 'entries', 'users'
  add_foreign_key 'likes', 'microposts'
  add_foreign_key 'likes', 'users'
  add_foreign_key 'messages', 'rooms'
  add_foreign_key 'messages', 'users'
  add_foreign_key 'microposts', 'users'
  add_foreign_key 'recommends', 'books'
  add_foreign_key 'recommends', 'users'
  add_foreign_key 'subscriptions', 'books'
  add_foreign_key 'subscriptions', 'users'
end
