class AddCollaboratorIdToAppointment < ActiveRecord::Migration[6.1]
  def change
    add_column :appointments, :collaborator_id, :integer
    add_foreign_key :appointments, :collaborators
  end
end
