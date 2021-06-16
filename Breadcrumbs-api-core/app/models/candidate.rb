class Candidate < ApplicationRecord
  belongs_to :user
  belongs_to :interview_process
  belongs_to :business_title, optional: true

  has_many :appointments

  accepts_nested_attributes_for :user, allow_destroy: true, update_only: true


end
