Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/home', to: 'users#index' # テスト用のルーティング

      get '/login', to: 'sessions#new'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'

    end
  end
end
