class CreateCandidates < ActiveRecord::Migration[6.1]
  def change
    create_table :candidates do |t|
      t.references :user, null: false, foreign_key: true
      t.references :interview_process, null: false, foreign_key: true
      t.references :business_title,  foreign_key: true

      t.timestamps
    end
  end
end
