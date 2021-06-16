class SocialPost < ApplicationRecord

  validates_presence_of :social_network ,  :title , :headline, :created_at , :updated_at
  # TODO Add test at next migration

end
