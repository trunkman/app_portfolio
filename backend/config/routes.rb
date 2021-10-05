Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root   'static_pages#home'
      post   '/signup',    to: 'users#create'
      post   '/login',     to: 'sessions#create'
      delete '/logout',    to: 'sessions#destroy'
      get    '/logged_in', to: 'sessions#logged_in?'
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
