class CreateAmbassadors < ActiveRecord::Migration[6.1]
  def change
    create_table :ambassadors do |t|
      t.references :collaborator, null: false, foreign_key: true
      t.references :message_feed, null: false, foreign_key: true
      t.string :catch_phrase
      t.text :description

      t.timestamps
    end
  end
end
