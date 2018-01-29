module ActiveAdmin
  module QiniuInput
    class Engine < ::Rails::Engine
      initializer 'active_admin.qiniu_input.precompile', group: :all do |app|
        app.config.assets.precompile += %w[Moxie.swf]
      end
    end
  end
end
