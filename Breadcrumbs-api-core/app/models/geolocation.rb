class Geolocation < ApplicationRecord
  belongs_to :address
  has_many :resting_places

  validates_presence_of :address_id, :latitude , :longitude
end
