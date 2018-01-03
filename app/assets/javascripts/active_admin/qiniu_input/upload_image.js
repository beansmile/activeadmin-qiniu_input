$(document).ready(function() {
  var changeHandler = function(event) {
    if (event.target.files[0]) {
      var _that = this;
      $(_that).siblings('.upload-span').text($(_that).data('uploading-text'));
      getQiniuMeta(_that, event);
    }
  };

  $(document).on('change', '.add-single-picture .add-image', changeHandler)

  function getQiniuMeta(_that, event) {
    $.ajax({
      type: 'GET',
      url: $(_that).data('qiniu-meta-url'),
      success: function(data) {
        var token = data.token;
        var bucketDomain = data.bucket_domain;
        var bucketDomain = data.bucket_domain;
        if (token !== "") {
          uploadImageToQiniu(token, event, function(response) {
            var url = "http://" + bucketDomain + "/" + response.key;
            var imageShowEle = $(_that).parent().find('.image-show');
            $(_that).siblings('.upload-span').text($(_that).data('upload-span-text'));
            if(imageShowEle.length > 0) {
              imageShowEle.attr('src', url);
            } else {
              $(_that).before("<img src='" + url + "' class='image-show'/>");
            }
            $(_that).parent().find(".single-image").val(url);
          });
       }
      }
    });
  }

  function uploadImageToQiniu(token, event, callbackFunc) {
    var formData = new FormData();
    formData.append('token', token);
    formData.append('file', event.target.files[0]);

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
            // setProgressbar($progressbar, evt.loaded, evt.total);
            console.log(evt.total)
          }
        };
        return xhr;
      },
      success: callbackFunc
    });
  }
})
