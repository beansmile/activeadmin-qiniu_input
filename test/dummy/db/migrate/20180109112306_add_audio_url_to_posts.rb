class AddAudioUrlToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :audio_url, :string
  end
end
