class CreateInterviewTips < ActiveRecord::Migration[6.1]
  def change
    create_table :interview_tips do |t|
      t.integer :ranking
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
