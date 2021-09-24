Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/home',      to: 'users#index' # テスト用のルーティング
      get '/signup',    to: 'users#new'
      get '/login',     to: 'sessions#new'
      post '/login',    to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'

      resources :users
    end
  end
end
