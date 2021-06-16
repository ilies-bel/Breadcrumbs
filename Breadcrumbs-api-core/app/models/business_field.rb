class BusinessField < ApplicationRecord
  has_many :business_titles
  has_many :interview_types

  validates_presence_of :field_name, :description 
end
