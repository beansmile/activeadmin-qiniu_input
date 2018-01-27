class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :image_url
      t.string :video_url
      t.string :audio_url
      t.references :post

      t.timestamps
    end
  end
end
