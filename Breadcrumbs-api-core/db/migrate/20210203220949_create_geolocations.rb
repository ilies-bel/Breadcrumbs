class CreateGeolocations < ActiveRecord::Migration[6.1]
  def change
    create_table :geolocations do |t|
      t.references :address, null: false, foreign_key: true
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
