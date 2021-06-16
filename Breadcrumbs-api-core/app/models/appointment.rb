class Appointment < ApplicationRecord
  belongs_to :interview_milestone
  belongs_to :candidate
  belongs_to :collaborator
  belongs_to :meeting_room

  validates_presence_of  :end_time ,
                        :start_time ,
                        :is_confirmed ,
                        :is_completed ,
                        :note

end
