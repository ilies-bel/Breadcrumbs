class Office < ApplicationRecord
  belongs_to :address
  has_many :collaborators
  has_many :resting_places
  has_many :meeting_rooms

  validates_presence_of  :is_headquarters ,:name
end
