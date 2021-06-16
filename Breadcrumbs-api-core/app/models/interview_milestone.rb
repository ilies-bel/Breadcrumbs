class InterviewMilestone < ApplicationRecord
  belongs_to :interview_process
  belongs_to :interview_type, optional: true

  has_one :appointment

  validates_presence_of :milestone_name, :interview_process
end
