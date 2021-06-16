class BusinessTitle < ApplicationRecord
  belongs_to :business_field

  has_one :candidate
  has_one :collaborator

  validates_presence_of :title , :description
end
