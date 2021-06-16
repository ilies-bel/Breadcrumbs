class CreateQualifiers < ActiveRecord::Migration[6.1]
  def change
    create_table :qualifiers do |t|
      t.string :qualifier_name
      t.integer :select_count

      t.timestamps
    end
  end
end
