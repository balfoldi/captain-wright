# frozen_string_literal: true
Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    resources :lawyers, except: [:edit, :new]
  end

  get "/court/lawyers", to: "court#index"
  get "/court/room", to: "court#index"
end
