module ActiveAdmin
  module Inputs
    class QiniuImageInput
      include Formtastic::Inputs::Base

      def to_html
        input_wrapping do
          value = object.try(method)
          label_html <<
            <<-HTML
              <div
                class="qiniu-image-wrapper qiniu-input-wrapper"
                data-uptoken-url="#{ActiveAdmin::QiniuInput.qiniu_meta_url}"
                data-domain="#{ActiveAdmin::QiniuInput.domain}"
                data-flash-swf-url="#{ActionController::Base.helpers.asset_path('Moxie.swf')}"
                data-uploading-text="#{I18n.t('active_admin.qiniu_input.uploading')}"
                data-upload-span-text="#{I18n.t('active_admin.qiniu_input.upload_span')}"
                >
                <input type="hidden" name="#{object_name}[#{input_name}]"value="#{value}" class="real-input"/>
                <div class="add-single-picture">
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
