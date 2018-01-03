ActiveAdmin.register Post do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
  permit_params :title, :image_url, :video_url
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

  index do
    column :title
    qiniu_image_column :image_url
    qiniu_video_column :video_url
    actions
  end

  show do
    attributes_table do
      row :id
      row :title
      qiniu_image_row :image_url
      qiniu_video_row :video_url
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs do
      f.input :title
      f.input :image_url, as: :qiniu_image
      f.input :video_url, as: :qiniu_video
    end
    f.actions
  end
end
