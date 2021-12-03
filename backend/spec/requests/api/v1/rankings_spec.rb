# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RecommendsController', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:second_user) { FactoryBot.create(:user) }
  let(:third_user) { FactoryBot.create(:user) }
  let(:fourth_user) { FactoryBot.create(:user) }
  let(:diary_params) { {date: '1999/12/31', sleeping_hours: 7.5 , feeling: 'satisfied'} } 

  # let(:fifth_user) { FactoryBot.create(:user) }
  # let(:six_user) { FactoryBot.create(:user) }
  # let(:seventh_user) { FactoryBot.create(:user) }

  it '睡眠平均時間、上位6人を返す' do
    # third_userが1位になるように設定
    first_diary = user.diaries.create(diary_params)
    second_diary = second_user.diaries.create(diary_params)
    third_diary_1 = third_user.diaries.create( { date: '1999/12/31', sleeping_hours: 10 , feeling: 'satisfied'} )
    third_diary_2 = third_user.diaries.create( { date: '2000/01/01', sleeping_hours:  8, feeling: 'satisfied'} )
    fourth_diary = fourth_user.diaries.create(diary_params)
    log_in_as(user)
    get api_v1_rankings_sleeping_hours_path
    expect(json['sleeping_hours_rank'].length).to eq(3)
    expect(json['sleeping_hours_rank'][0]['user']['name']).to eq(third_user.name)
    expect(json['sleeping_hours_rank'][0]['average']).to eq(9)
    expect(response.status).to eq(200)
  end

  it '未ログインでは睡眠平均時間、上位6人を返せない' do
    get api_v1_rankings_sleeping_hours_path
    expect(response.status).to eq(401)
  end

end
