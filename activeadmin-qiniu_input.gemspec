$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require 'active_admin/qiniu_input/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'activeadmin-qiniu_input'
  s.version     = ActiveAdmin::QiniuInput::VERSION
  s.authors     = %w[Cain Jayce Roger]
  s.email       = %w[cain@beansmile.com jayce@beansmile.com roger@beansmile.com]
  s.homepage    = 'https://github.com/beansmile/activeadmin-qiniu_input'
  s.summary     = <<-TEXT
    ActiveAdmin Inputs for using qiniu to upload image or video.
TEXT
  s.description = <<-TEXT
    ActiveAdmin Inputs for using qiniu to upload image or video.
TEXT
  s.license     = 'MIT'

  s.files = Dir['{app,config,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.md']

  s.add_dependency 'rails', '>= 5.1'
  s.add_dependency 'activeadmin', '>= 1.1'
  s.add_dependency 'qiniu', '>= 6.9'

  s.add_development_dependency 'sqlite3', '~> 1.3'
end
