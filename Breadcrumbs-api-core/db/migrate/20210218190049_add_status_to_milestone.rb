class AddStatusToMilestone < ActiveRecord::Migration[6.1]
  def change
    add_column :interview_milestones, :finished , :boolean
  end
end
