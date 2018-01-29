$(document).ready(function() {
  $('.qiniu-video-wrapper').each(function(_index, element) {
    QiniuInput.initVideoInput(element)
  })

  $(document).on('click', '.delete-video', function(e){
    e.preventDefault();
    var _this = $(this);
    _this.parents('.qiniu-video-wrapper').find('.inline-hints').html('');
    _this.siblings('.real-input').val('');
    _this.siblings('.video-file').val('');
    _this.siblings('.file-name').text('');
    _this.siblings(".upload-video").attr('disabled', 'disabled');
    _this.attr('disabled', 'disabled');
  });
})
