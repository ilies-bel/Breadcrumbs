class CreateInterviewProcesses < ActiveRecord::Migration[6.1]
  def change
    create_table :interview_processes do |t|
      t.string :process_name
      t.boolean :template, default: false
      t.timestamps
    end
  end
end
