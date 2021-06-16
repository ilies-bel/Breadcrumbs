class CreateThemes < ActiveRecord::Migration[6.1]
  def change
    create_table :themes do |t|
      t.string :primary_color
      t.string :secondary_color
      t.string :logo_url
      t.string :splash_logo_url

      t.timestamps
    end
  end
end
