class MeetingRoom < ApplicationRecord
  belongs_to :office

  has_many :appointments

  validates_presence_of :name ,  :how_do_i_get_there
end
