class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :social_network
      t.string :title
      t.string :link
      t.integer :logo_id

      t.timestamps
    end
  end
end
