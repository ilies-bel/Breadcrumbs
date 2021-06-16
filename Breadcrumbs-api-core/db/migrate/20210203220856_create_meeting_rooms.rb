class CreateMeetingRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :meeting_rooms do |t|
      t.references :office, null: false, foreign_key: true
      t.string :name
      t.string :how_do_i_get_there

      t.timestamps
    end
  end
end
