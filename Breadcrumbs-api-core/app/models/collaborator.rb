class Collaborator < ApplicationRecord
  belongs_to :user
  belongs_to :business_title, optional: true
  belongs_to :office, optional: true

  has_one :ambassador
  has_many :appointments

  validates_presence_of :user
  accepts_nested_attributes_for :user,update_only: true, allow_destroy: true

end
