$(document).ready(function() {
  $('.qiniu-audio-wrapper').each(function(index, element) {
    QiniuInput.initAudioInput(element)
  })

  $(document).on('click', '.delete-audio', function(e){
    e.preventDefault();
    var _this = $(this);
    _this.parents('.qiniu-audio-wrapper').find('.inline-hints').html('');
    _this.siblings('.real-input').val('');
    _this.siblings('.audio-file').val('');
    _this.siblings('.file-name').text('');
    _this.siblings(".upload-audio").attr('disabled', 'disabled');
    _this.attr('disabled', 'disabled');
  });
})
