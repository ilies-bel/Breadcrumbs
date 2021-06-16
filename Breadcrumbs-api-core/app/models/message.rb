class Message < ApplicationRecord
  belongs_to :user
  belongs_to :message_feed

  validates_presence_of :message_feed , :content ,:created_at , :updated_at
end
