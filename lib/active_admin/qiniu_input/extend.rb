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
      url.present? ?
        video_tag(url, width: 150, controls: true, preload: 'auto', controlsList: 'nodownload') :
        url
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
      url.present? ?
        video_tag(url, width: 300, controls: true, preload: 'auto', controlsList: 'nodownload') :
        url
    end
  end
end
