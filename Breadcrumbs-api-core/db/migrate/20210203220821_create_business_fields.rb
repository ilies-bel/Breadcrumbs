class CreateBusinessFields < ActiveRecord::Migration[6.1]
  def change
    create_table :business_fields do |t|
      t.string :field_name
      t.text :description

      t.timestamps
    end
  end
end
