module ActiveAdmin
  module Inputs
    class QiniuVideoInput
      include Formtastic::Inputs::Base

      def to_html
        input_wrapping do
          value = object.try(method)
          label_html <<
            <<-HTML
              <div class="qiniu-video-wrapper qiniu-input-wrapper"
                data-uptoken-url="#{ActiveAdmin::QiniuInput.qiniu_meta_url}"
                data-domain="#{Qiniu::Config.settings[:domain]}"
                data-flash-swf-url="#{ActionController::Base.helpers.asset_path('Moxie.swf')}"
                data-unsupported-format="#{I18n.t('active_admin.qiniu_input.unsupported_format')}"
                >
                <div class="upload-btn">
                  <input name="#{object_name}[#{input_name}]" class="real-input" value="#{value}" type="hidden"/>
                  <input accept="video/*" class="video-file" type="file"/>
                  <span class='file-select'>#{I18n.t('active_admin.qiniu_input.choose_file')}</span>
                  <span class='file-name'></span>
                  <button class='upload-video' disabled="disabled">#{I18n.t('active_admin.qiniu_input.upload')}</button>
                  <button class='delete-video' #{value.present? ? '' : 'disabled="disabled"'}>#{I18n.t('active_admin.qiniu_input.delete')}</button>
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
