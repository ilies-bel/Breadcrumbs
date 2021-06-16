class CreateOffices < ActiveRecord::Migration[6.1]
  def change
    create_table :offices do |t|
      t.references :address, null: false, foreign_key: true
      t.string :name
      t.boolean :is_headquarters

      t.timestamps
    end
  end
end
