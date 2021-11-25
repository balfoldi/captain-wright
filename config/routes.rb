# frozen_string_literal: true
Rails.application.routes.draw do
  namespace :api do
    resources :lawyers, except: [:edit, :new]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'pages#index'
end
