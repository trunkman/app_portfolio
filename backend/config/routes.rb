# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root   'static_pages#home'
      post   '/signup',    to: 'users#create'
      post   '/login',     to: 'sessions#create'
      delete '/logout',    to: 'sessions#destroy'
      get    '/logged_in', to: 'sessions#logged_in'
      resources :users do
        member do
          get :following,
              :followers,
              :microposts,
              :rooms,
              :books,
              :diaries,
              :liked_microposts,
              :commented_microposts
        end
      end
      resources :microposts,   only: %i[create destroy]
      get    '/miroposts/:id', to: 'microposts#liked_micropost'
      get    '/follow',        to: 'relationships#following_status'
      post   '/follow',        to: 'relationships#create'
      delete '/unfollow/:id',  to: 'relationships#destroy'
      post   '/likes',         to: 'likes#like'
      post   '/unlikes',       to: 'likes#unlike'
      resources :comments,     only: %i[create destroy]
      resources :rooms,        only: %i[show create destroy]
      # get '/talk_room/:id', to: 'rooms#talk_room'
      resources :messages,     only: %i[create destroy]
      resources :books,        only: %i[show create update]
      post '/booksearch', to: 'books#search'
      resources :diaries, only: %i[create update destroy]
      resources :account_activations, only: [:edit]
      resources :password_resets, only: %i[create edit update]
      resources :recommends, only: %i[create destroy]
    end
  end
end
