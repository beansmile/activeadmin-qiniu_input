module ActiveAdmin
  module Inputs
    class QiniuImageInput
      include Formtastic::Inputs::Base

      def to_html
        input_wrapping do
          value = object.try(method)
          label_html <<
            <<-HTML
              <div class="qiniu-image-input">
                <div class="add-single-picture">
                  <input type="file" class="add-image"
                    data-uploading-text="#{I18n.t('active_admin.qiniu_input.uploading')}"
                    data-upload-span-text="#{I18n.t('active_admin.qiniu_input.upload_span')}"
                    data-qiniu-meta-url="#{ActiveAdmin::QiniuInput.qiniu_meta_url}" />
                  <input name="#{object_name}[#{input_name}]" class="hidden-input single-image" value="#{value}"/>
                  <span class='image-container'>
                    #{value.present? ? "<img src=\"#{value}\" class=\"image-show\" />" : ''}
                  </span>
                  <span class="upload-icon"></span>
                  <span class="upload-span">#{I18n.t('active_admin.qiniu_input.upload_span')}</span>
                </div>
                <p class='size-hints'>(#{options[:qiniu_image_hint] || I18n.t('active_admin.qiniu_input.upload_image_hint')})&nbsp;<button class='delete_image' #{value.present? ? '' : 'disabled="disabled"'}>#{I18n.t('active_admin.qiniu_input.delete')}</button></p>
              </div>
            HTML
            .html_safe
        end
      end
    end
  end
end
