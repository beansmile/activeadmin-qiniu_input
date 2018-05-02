require 'activeadmin'
require 'qiniu'
require 'active_admin/qiniu_input/engine'
require 'active_admin/qiniu_input/version'
require 'active_admin/qiniu_input/extend'
require 'active_admin/inputs/qiniu_image_input'
require 'active_admin/inputs/qiniu_video_input'
require 'active_admin/inputs/qiniu_audio_input'

module ActiveAdmin
  module QiniuInput
    mattr_accessor :qiniu_meta_url, :domain
    self.qiniu_meta_url = '/qiniu_meta'
  end
end
