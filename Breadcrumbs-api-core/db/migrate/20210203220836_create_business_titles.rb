class CreateBusinessTitles < ActiveRecord::Migration[6.1]
  def change
    create_table :business_titles do |t|
      t.references :business_field, null: false, foreign_key: true
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
