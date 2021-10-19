require 'rails_helper'

RSpec.describe 'sessions_api', type: :request do
  let(:user)       { FactoryBot.create(:alice) }
  let(:other_user) { FactoryBot.create(:bob) }
end
