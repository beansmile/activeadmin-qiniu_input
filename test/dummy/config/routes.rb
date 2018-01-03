Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  get 'qiniu_meta', to: 'application#qiniu_meta'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
