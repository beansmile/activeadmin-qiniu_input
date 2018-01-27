$(document).ready(function() {
  $(document).on('click', '.delete_image', function(e){
    e.preventDefault();
    var _this = $(this);
    var qiniuImageWrapper = _this.parents('.qiniu-image-wrapper');
    qiniuImageWrapper.find('.real-input').val('');
    qiniuImageWrapper.find('.image-container').html('');
    _this.attr('disabled', 'disabled');
  });

  $('.qiniu-image-wrapper').each(function(_index, element) {
    QiniuInput.initImageInput(element)
  })
})
