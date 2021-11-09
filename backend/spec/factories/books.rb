FactoryBot.define do
  factory :book do
    title { "MyString" }
    auther { "MyString" }
    publisher_name { "MyString" }
    sales_date { "MyString" }
    item_price { 1 }
    item_url { "MyText" }
    item_caption { "MyText" }
    image_url { "MyText" }
    isbn { "MyString" }
    review_count { 1 }
    review_average { "MyString" }
  end
end
