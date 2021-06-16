class MessageFeed < ApplicationRecord
  has_one :ambassador
  has_many :messages

  validates_presence_of :updated_at, :created_at
end
