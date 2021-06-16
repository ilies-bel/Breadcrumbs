class CreateRestingPlaces < ActiveRecord::Migration[6.1]
  def change
    create_table :resting_places do |t|
      t.references :office, null: false, foreign_key: true
      t.references :geolocation, null: false, foreign_key: true
      t.integer :ranking
      t.string :title
      t.text :description
      t.string :link

      t.timestamps
    end
  end
end
