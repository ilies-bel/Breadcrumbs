class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.references :interview_milestone, null: false, foreign_key: true
      t.references :candidate, null: false, foreign_key: true
      t.references :meeting_room, null: false, foreign_key: true
      t.datetime :start_time
      t.datetime :end_time
      t.string :note
      t.boolean :is_confirmed
      t.boolean :is_completed

      t.timestamps
    end
  end
end
