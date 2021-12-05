# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root   'static_pages#home'
      post   '/signup', to: 'users#create'
      post   '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      get    '/logged_in', to: 'sessions#logged_in'
      resources :users do
        member do
          get :microposts,
              :following,
              :followers,
              :diaries,
              :timeline,
              :books,
              :rooms,
              :ranking
        end
      end
      resources :account_activations, only: [:edit]
      resources :password_resets, only: %i[create edit update]
      resources :relationships, only: %i[create destroy]
      resources :microposts, only: %i[show create destroy]
      post      '/likes', to: 'likes#like'
      post      '/unlikes', to: 'likes#unlike'
      resources :comments, only: %i[create destroy]
      resources :diaries, only: %i[create update destroy]
      get       '/sleep_debt/:id', to: 'diaries#sleep_debt'
      resources :books, only: %i[show create update]
      post      '/book_search', to:   'books#search'
      resources :rooms, only: %i[show create destroy]
      resources :messages, only: %i[create destroy]
      resources :recommends, only: %i[create destroy]
      resources :notifications, only: %i[index create]
      delete    '/notifications/all_delete', to: 'notifications#all_delete'
      get       '/notifications/check', to: 'notifications#check'
      get       '/rankings/sleeping_hours', to: 'rankings#sleeping_hours'
      get       '/rankings/reading', to: 'rankings#reading'
      get       '/rankings/read_books', to: 'rankings#read_books'
      get       '/rankings/stack_books', to: 'rankings#stack_books'
    end
  end
end
