Rails.application.routes.draw do
  namespace :api do
    resources :todos, defaults: {format: :json}, except: [:new, :edit]
  end
end
