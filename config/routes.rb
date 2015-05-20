Rails.application.routes.draw do
  resources :todos, defaults: {format: :json}, except: [:new, :edit]
end
