$(document).ready(function() {

  $(document).on('click', '.upload_video', function(e){
    e.preventDefault();
    fileUpload($(this).siblings(".video_file"), afterFileUpload);
  })

  $(document).on('click', '.delete_video', function(e){
    e.preventDefault();
    var _this = $(this);
    _this.parents('.video-wrapper').find('.inline-hints').html('');
    _this.siblings('.video_field').val('');
    _this.siblings('.video_file').val('');
    _this.siblings('.file-name').text('');
    _this.siblings(".upload_video").attr('disabled', 'disabled');
    _this.attr('disabled', 'disabled');
  });

  $(document).on('change', '.video_file', function() {
    var file = $(this)[0].files[0];
    $(this).siblings('.file-name').text(file.name);
    $(this).siblings(".upload_video").removeAttr('disabled');
  });

  function afterFileUpload ($self, url) {
    loadVideo($self, url);
    $self.siblings('.delete_video').removeAttr('disabled');
  }

  function loadVideo($self, url) {
    $self.siblings('.video_field').val(url);
    $hints = $self.parents('.video-wrapper').find('.inline-hints');
    if ($hints.find('.video').length > 1) {
      $hints.find('.video').attr('src', url);
    } else {
      $hints.html('<video src="' + url + '" controls="controls" controlsList="nodownload" preload="auto"></video>')
    }
  }

  function fileUpload($self, callback) {
    var $progressbar = $self.parents('.upload-btn').next('.progressbar');
    var files = $self[0].files;
    var accept = $self.attr("accept").split("/")[0]
    if (files.length > 0){
      var file = files[0];
      if(file.type.startsWith(accept)) {
        $self.attr("disabled", true);
        initProgressbar($progressbar, file);

        $.ajax({
          type: 'GET',
          data: { type: $self.data('type'), uploadType: 'video' },
          url: $self.data('qiniu-meta-url'),
          success: function(data) {
           var token = data.token;
           var bucketDomain = data.bucket_domain;
           if (token !== "") {
             qiniuUpload(file, token, bucketDomain, $self, $progressbar, callback);
           }
          }
        });
      } else {
        alert($self.data('unsupported-format'));
      }
    }
  }

  function qiniuUpload(f, token, bucketDomain, $self, $progressbar, callback) {
    var formData;
    formData = new FormData();
    formData.append('token', token);
    formData.append('file', f);
    if (f.name && f.name.length > 0) {
      var prefix = (new Date()).getTime() + '-' + Math.floor(Math.random() * Math.floor(1000))
      formData.append('key', prefix + '-' + f.name);
    }

    $.ajax({
      url: "http://up-z2.qiniu.com",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
      type: 'POST',
      xhr: function() {
        var xhr = $.ajaxSettings.xhr();
        xhr.upload.onprogress = function (evt) {
          if (evt.lengthComputable) {
            setProgressbar($progressbar, evt.loaded, evt.total);
          }
        };
        return xhr;
      },
      success: function(data) {
        $progressbar.fadeOut();
        $self.removeAttr("disabled");
        $(this).siblings(".upload_video").attr('disabled', 'disabled');
        var url = "http://" + bucketDomain + "/" + data.key;
        callback($self, url);
      }
    });
  }

  function initProgressbar($progressbar, file) {
    $progressbar.find('.name').text(file.name);
    $progressbar.find('.file-size').text(calculateFileSize(file.size));
    $progressbar.find('.bar').css('width', '0px');
    $progressbar.fadeIn();
  }

  function setProgressbar($progressbar, loaded, total) {
    var loadedText = calculateFileSize(loaded);
    var percentComplete = Math.round(loaded * 100 / total) + '%';
    $progressbar.find('.percentage').text(percentComplete);
    $progressbar.find('.loaded').text(loadedText);
    $progressbar.find('.bar').css('width', percentComplete);
  }

  function calculateFileSize(size) {
    return (Math.round(size * 100 / (1024 * 1024)) / 100).toString()
  }
})
