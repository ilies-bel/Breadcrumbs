class CreateAddresses < ActiveRecord::Migration[6.1]
  def change
    create_table :addresses do |t|
      t.integer :street_number
      t.integer :street_name
      t.string :street_type
      t.integer :zip_code
      t.string :city
      t.string :country

      t.timestamps
    end
  end
end
