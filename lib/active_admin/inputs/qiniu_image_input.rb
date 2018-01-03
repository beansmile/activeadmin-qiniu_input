module ActiveAdmin
  module Inputs
    class QiniuImageInput
      include Formtastic::Inputs::Base

      def to_html
        input_wrapping do
          label_html <<
            <<-HTML
              <div class="qiniu-image-input">
                <div class="add-single-picture">
                  <input type="file" name="file" class="add-image"
                    data-uploading-text="#{I18n.t('active_admin.qiniu_input.uploading')}"
                    data-upload-span-text="#{I18n.t('active_admin.qiniu_input.upload_span')}"
                    data-qiniu-meta-url="#{ActiveAdmin::QiniuInput.qiniu_meta_url}" />
                  <input name="#{object_name}[#{input_name}]" class="hidden-input single-image" value="#{object.try(method)}"/>
                  #{object.try(method).present? ? "<img src=\"#{object.try(method)}\" class=\"image-show\" />" : ''}
                  <span class="upload-icon"></span>
                  <span class="upload-span">#{I18n.t('active_admin.qiniu_input.upload_span')}</span>
                </div>
                <p class='size-hints'>(#{options[:hint] || I18n.t('active_admin.qiniu_input.upload_image_hint')})</p>
              </div>
            HTML
            .html_safe
        end
      end
    end
  end
end
