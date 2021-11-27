# frozen_string_literal: true
Rails.application.routes.draw do
  namespace :api do
    get 'cases/index'
    get 'cases/create'
  end
  root 'pages#index'

  namespace :api do
    resources :lawyers, except: [:edit, :new]
    resources :cases, only: [:create, :index]
  end

  get "/court/lawyers", to: "court#index"
  get "/court/special-objects-choice", to: "court#index"
  get "/court/room", to: "court#index"
end
