window.QiniuInput = {
  initImageInput: function(wrapperElement) {
    var qiniuImageWrapper = $(wrapperElement)
    var uploader = Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: qiniuImageWrapper.find('.add-single-picture')[0],
      uptoken_url: qiniuImageWrapper.data('uptoken-url'),
      get_new_uptoken: false,
      domain: qiniuImageWrapper.data('domain'),
      flash_swf_url: qiniuImageWrapper.data('flash-swf-url'),
      max_retries: 1,
      dragdrop: false,
      chunk_size: '4mb',
      auto_start: true,
      multi_selection: false,
      filters: {
        mime_types : "image/*"
      },
      init: {
        'FilesAdded': function(up, files) {
        },
        'BeforeUpload': function(up, file) {
          qiniuImageWrapper.find('.upload-span').text(qiniuImageWrapper.data('uploading-text'));
        },
        'UploadProgress': function(up, file) {
        },
        'FileUploaded': function(up, file, info) {
          var response = info.response
          var json = JSON.parse(response)
          var key = json.key
          var url = qiniuImageWrapper.data('protocol') + "://" + up.getOption('domain') + "/" + key;
          var imageShowEle = qiniuImageWrapper.find('.image-show');
          qiniuImageWrapper.find('.upload-span').text(qiniuImageWrapper.data('upload-span-text'));
          if(imageShowEle.length > 0) {
            imageShowEle.attr('src', url);
          } else {
            qiniuImageWrapper.find(".image-container").html("<img src='" + url + "' class='image-show'/>");
          }
          qiniuImageWrapper.find(".real-input").val(url);
          qiniuImageWrapper.find(".delete_image").removeAttr('disabled');
        },
        'Error': function(up, err, errTip) {
          alert(errTip)
          qiniuImageWrapper.find('.upload-span').text(qiniuImageWrapper.data('upload-span-text'));
        },
        'UploadComplete': function() {
        },
        'Key': function(up, file) {
          var prefix = (new Date()).getTime() + '-' + Math.floor(Math.random() * Math.floor(1000))
          return prefix + '-' + file.name
        }
      }
    })
  },
  initVideoInput: function(wrapperElement) {
    var qiniuVideoWrapper = $(wrapperElement)
    var progressbar = qiniuVideoWrapper.find('.progressbar')
    var uploader = Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: qiniuVideoWrapper.find('.video-file')[0],
      uptoken_url: qiniuVideoWrapper.data('uptoken-url'),
      get_new_uptoken: false,
      domain: qiniuVideoWrapper.data('domain'),
      flash_swf_url: qiniuVideoWrapper.data('flash-swf-url'),
      max_retries: 1,
      dragdrop: false,
      chunk_size: '4mb',
      auto_start: false,
      multi_selection: false,
      filters: {
        mime_types : "video/*"
      },
      init: {
        'FilesAdded': function(up, files) {
          up.files = files
          if (up.files.length > 0) {
            qiniuVideoWrapper.find('.file-name').text(up.files[0].name)
            qiniuVideoWrapper.find('.upload-video').removeAttr('disabled')
          }
        },
        'BeforeUpload': function(up, file) {
          var uploadButton = qiniuVideoWrapper.find('.upload-video')
          uploadButton.attr("disabled", true);
          QiniuInput.initProgressbar(progressbar, file);
        },
        'UploadProgress': function(up, file) {
          QiniuInput.setProgressbar(progressbar, file.loaded, file.size);
        },
        'FileUploaded': function(up, file, info) {
          progressbar.fadeOut();
          qiniuVideoWrapper.find('.video-file').removeAttr("disabled");
          qiniuVideoWrapper.find(".upload-video").attr('disabled', 'disabled');

          var response = info.response
          var json = JSON.parse(response)
          var key = json.key
          var url = qiniuVideoWrapper.data('protocol') + "://" + up.getOption('domain') + "/" + key;
          qiniuVideoWrapper.find('.real-input').val(url);
          hints = qiniuVideoWrapper.find('.inline-hints');
          if (hints.find('.video').length > 1) {
            hints.find('.video').attr('src', url);
          } else {
            hints.html('<video src="' + url + '" controls="controls" controlsList="nodownload" preload="auto"></video>')
          }
          qiniuVideoWrapper.find('.delete-video').removeAttr('disabled');
        },
        'Error': function(up, err, errTip) {
          alert(errTip)
          progressbar.fadeOut();
          qiniuVideoWrapper.find('.video-file').removeAttr("disabled");
          qiniuVideoWrapper.find(".upload-video").attr('disabled', 'disabled');
        },
        'UploadComplete': function() {
        },
        'Key': function(up, file) {
          var prefix = (new Date()).getTime() + '-' + Math.floor(Math.random() * Math.floor(1000))
          return prefix + '-' + file.name
        }
      }
    })
    qiniuVideoWrapper.find('.upload-video').off('click').on('click', function(e) {
      e.preventDefault()
      uploader.start()
    })
  },
  initAudioInput: function(wrapperElement) {
    var qiniuAudioWrapper = $(wrapperElement)
    var progressbar = qiniuAudioWrapper.find('.progressbar')
    var uploader = Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: qiniuAudioWrapper.find('.audio-file')[0],
      uptoken_url: qiniuAudioWrapper.data('uptoken-url'),
      get_new_uptoken: false,
      domain: qiniuAudioWrapper.data('domain'),
      flash_swf_url: qiniuAudioWrapper.data('flash-swf-url'),
      max_retries: 1,
      dragdrop: false,
      chunk_size: '4mb',
      auto_start: false,
      multi_selection: false,
      filters: {
        mime_types : "audio/*"
      },
      init: {
        'FilesAdded': function(up, files) {
          up.files = files
          if (up.files.length > 0) {
            qiniuAudioWrapper.find('.file-name').text(up.files[0].name)
            qiniuAudioWrapper.find('.upload-audio').removeAttr('disabled')
          }
        },
        'BeforeUpload': function(up, file) {
          var uploadButton = qiniuAudioWrapper.find('.upload-audio')
          uploadButton.attr("disabled", true);
          QiniuInput.initProgressbar(progressbar, file);
        },
        'UploadProgress': function(up, file) {
          QiniuInput.setProgressbar(progressbar, file.loaded, file.size);
        },
        'FileUploaded': function(up, file, info) {
          progressbar.fadeOut();
          qiniuAudioWrapper.find('.audio-file').removeAttr("disabled");
          qiniuAudioWrapper.find(".upload-audio").attr('disabled', 'disabled');

          var response = info.response
          var json = JSON.parse(response)
          var key = json.key
          var url = qiniuAudioWrapper.data('protocol') + "://" + up.getOption('domain') + "/" + key;
          qiniuAudioWrapper.find('.real-input').val(url);
          hints = qiniuAudioWrapper.find('.inline-hints');
          if (hints.find('.audio').length > 1) {
            hints.find('.audio').attr('src', url);
          } else {
            hints.html('<audio src="' + url + '" controls="controls" preload="auto"></audio>')
          }
          qiniuAudioWrapper.find('.delete-audio').removeAttr('disabled');
        },
        'Error': function(up, err, errTip) {
          alert(errTip)
          progressbar.fadeOut();
          qiniuAudioWrapper.find('.audio-file').removeAttr("disabled");
          qiniuAudioWrapper.find(".upload-audio").attr('disabled', 'disabled');
        },
        'UploadComplete': function() {
        },
        'Key': function(up, file) {
          var prefix = (new Date()).getTime() + '-' + Math.floor(Math.random() * Math.floor(1000))
          return prefix + '-' + file.name
        }
      }
    })
    qiniuAudioWrapper.find('.upload-audio').off('click').on('click', function(e) {
      e.preventDefault()
      uploader.start()
    })
  },
  initProgressbar: function(progressbar, file) {
    progressbar.find('.name').text(file.name);
    progressbar.find('.file-size').text(QiniuInput.calculateFileSize(file.size));
    progressbar.find('.bar').css('width', '0px');
    progressbar.fadeIn();
  },
  setProgressbar: function(progressbar, loaded, total) {
    var loadedText = QiniuInput.calculateFileSize(loaded);
    var percentComplete = Math.round(loaded * 100 / total) + '%';
    progressbar.find('.percentage').text(percentComplete);
    progressbar.find('.loaded').text(loadedText);
    progressbar.find('.bar').css('width', percentComplete);
  },
  calculateFileSize: function(size) {
    return (Math.round(size * 100 / (1024 * 1024)) / 100).toString()
  }
}

$(document).ready(function() {
  $(document).on('has_many_add:after', '.has_many_container', function(event, fieldset, container) {
    if ($(fieldset).find('.qiniu-input-wrapper').length > 0) {
      // Stop propagation event because the choice box will be trigger many times when it nesting has_many function.
      event.preventDefault();
      event.stopPropagation();

      $(fieldset).find('.qiniu-image-wrapper').each(function(_index, element) {
        QiniuInput.initImageInput(element)
      })
      $(fieldset).find('.qiniu-video-wrapper').each(function(_index, element) {
        QiniuInput.initVideoInput(element)
      })
      $(fieldset).find('.qiniu-audio-wrapper').each(function(_index, element) {
        QiniuInput.initAudioInput(element)
      })
    }
  })
})
