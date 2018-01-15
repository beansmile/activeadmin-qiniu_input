module ActiveAdmin
  module Inputs
    class QiniuVideoInput
      include Formtastic::Inputs::Base

      def to_html
        input_wrapping do
          value = object.try(method)
          label_html <<
            <<-HTML
              <div class="video-wrapper">
                <div class="upload-btn">
                  <input name="#{object_name}[#{input_name}]" class="hidden-input video_field" value="#{value}"/>
                  <input accept="video/*" class="video_file" type="file" data-unsupported-format="#{I18n.t('active_admin.qiniu_input.unsupported_format')}" data-qiniu-meta-url="#{ActiveAdmin::QiniuInput.qiniu_meta_url}" >
                  <span class='file-select'>#{I18n.t('active_admin.qiniu_input.choose_file')}</span>
                  <span class='file-name'></span>
                  <button class='upload_video' disabled="disabled">#{I18n.t('active_admin.qiniu_input.upload')}</button>
                </div>
                <div class='progressbar' hidden>
                  <div class='header'>
                    <span class="name"></span>
                    <span class="percentage">0%</span>
                  </div>
                  <div class='progress'>
                    <div class="bar"></div>
                  </div>
                  <div class='footer'>
                    #{I18n.t('active_admin.qiniu_input.uploaded')}: <span class='loaded'> 0M</span>M/<span class='file-size'> 0</span>M
                  </div>
                </div>
                <p class="inline-hints">
                  #{value.present? ? template.video_tag(value, controls: true, preload: 'auto', controlsList: 'nodownload') : ''}
                </p>
              </div>
            HTML
            .html_safe
        end
      end
    end
  end
end
