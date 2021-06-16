class Availability < ApplicationRecord
  belongs_to :collaborator

  validates_presence_of :start_time , :end_time , :created_at ,:updated_at
end
