Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/home', to: 'users#index'

      get '/signup' to: 'users#new'
      resources :users
    end
  end
end
