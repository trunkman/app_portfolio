Rails.application.routes.draw do
  # get 'likes/create'
  # get 'likes/destroy'
  namespace :api do
    namespace :v1 do
      root   'static_pages#home'
      post   '/signup',    to: 'users#create'
      post   '/login',     to: 'sessions#create'
      delete '/logout',    to: 'sessions#destroy'
      get    '/logged_in', to: 'sessions#logged_in'
      resources :users do
        member do
          get    :following, :followers
          get    '/microposts', to: 'users#microposts'
        end
      end
      resources :microposts,         only: %i[create destroy]
      resources :comments,           only: %i[create destroy]
      get    '/follow',   to: 'relationships#following_status'
      post   '/follow',   to: 'relationships#create'
      delete '/unfollow', to: 'relationships#destroy'
      post   '/likes',    to: 'likes#like'
      post   '/unlikes',  to: 'likes#unlike'
      
      resources :accountactivations, only: [:edit]
      resources :password_resets,    only: %i[new create edit update]
    end
  end
end
