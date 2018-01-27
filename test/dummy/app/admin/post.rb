ActiveAdmin.register Post do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
  permit_params(
    :title, :image_url, :video_url, :audio_url,
    comments_attributes: %i[id image_url video_url audio_url _destroy]
  )
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
    qiniu_audio_column :audio_url
    actions
  end

  show do
    attributes_table do
      row :id
      row :title
      qiniu_image_row :image_url
      qiniu_video_row :video_url
      qiniu_audio_row :audio_url
      row :comments do |post|
        table_for post.comments do
          qiniu_image_column :image_url
          qiniu_video_column :video_url
          qiniu_audio_column :audio_url
        end
      end
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs do
      f.input :title
      f.input :image_url, as: :qiniu_image, qiniu_image_hint: '图片最佳尺寸是 256 * 256'
      f.input :video_url, as: :qiniu_video
      f.input :audio_url, as: :qiniu_audio
      f.has_many :comments, new_record: true, allow_destroy: true do |g|
        g.input :image_url, as: :qiniu_image, qiniu_image_hint: '图片最佳尺寸是 256 * 256'
        g.input :video_url, as: :qiniu_video
        g.input :audio_url, as: :qiniu_audio
      end
    end
    f.actions
  end
end
