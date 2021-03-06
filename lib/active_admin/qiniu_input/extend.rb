ActiveAdmin::Views::TableFor.class_eval do
  def qiniu_image_column(attribute)
    column attribute do |model|
      url = model.try(attribute)
      url.present? ? image_tag(url, width: '100') : url
    end
  end

  def qiniu_video_column(attribute)
    column attribute do |model|
      url = model.try(attribute)
      if url.present?
        video(width: 150, controls: true, preload: 'auto') do
          source src: url
        end
      end
    end
  end

  def qiniu_audio_column(attribute)
    column attribute do |model|
      url = model.try(attribute)
      if url.present?
        audio(src: url, width: 150, controls: true, preload: 'auto')
      end
    end
  end
end

ActiveAdmin::Views::AttributesTable.class_eval do
  def qiniu_image_row(attribute)
    row attribute do |model|
      url = model.try(attribute)
      url.present? ? image_tag(url, width: '180') : url
    end
  end

  def qiniu_video_row(attribute)
    row attribute do |model|
      url = model.try(attribute)
      if url.present?
        video(width: 300, controls: true, preload: 'auto') do
          source src: url
        end
      end
    end
  end

  def qiniu_audio_row(attribute)
    row attribute do |model|
      url = model.try(attribute)
      if url.present?
        audio(src: url, width: 300, controls: true, preload: 'auto')
      end
    end
  end
end
