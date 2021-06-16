# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.integer :role
      t.boolean :push_notification, default: false
      t.boolean :mail_notification, default: false

      t.timestamps
    end
  end
end
