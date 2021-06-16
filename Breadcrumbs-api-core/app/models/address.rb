class Address < ApplicationRecord
  has_one :geolocation
  has_one :office
  validates_presence_of :city, :country , :street_name , :street_number , :street_type , :zip_code
end
