Rails.application.routes.draw do
  get 'static_pages/home'
  get 'password_resets/new'
  get 'password_resets/edit'
  namespace :api do
    namespace :v1 do
      root 'static_pages#home'
      get '/home',      to: 'users#index' # テスト用のルーティング
      get '/signup',    to: 'users#new'
      get '/login',     to: 'sessions#new'
      post '/login',    to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      resources :users do
        member do
          get :following, :followers
        end
      end
      resources :accountactivations, only: [:edit]
      resources :password_resets,    only: %i[new create edit update]
    end
  end
end
