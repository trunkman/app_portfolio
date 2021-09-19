require 'rails_helper'

RSpec.describe User, type: :model do

  before do 
    @user = User.new(name: "Example User", email: "user@example.com")
  end

  it "ユーザーが存在している確認" do
    @user.valid?
    expect(@user).to be_valid
  end

  it "nameが空であってはならない" do
    @user.name = nil
    expect(@user).not_to be_valid    
  end
  
end
