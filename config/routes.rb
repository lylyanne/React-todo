Rails.application.routes.draw do
  root to: "static_pages#main"
  namespace :api do
    resources :todos, defaults: {format: :json}, except: [:new, :edit]
  end
end
