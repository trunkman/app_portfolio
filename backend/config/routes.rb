Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/home', to: 'users#index'
      resources :users
    end
  end
end
