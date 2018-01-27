class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def qiniu_meta
    put_policy = Qiniu::Auth::PutPolicy.new(
      Qiniu::Config.settings[:bucket],
      nil,
      3600
    )
    uptoken = Qiniu::Auth.generate_uptoken(put_policy)
    render json: { uptoken: uptoken }
  end
end
