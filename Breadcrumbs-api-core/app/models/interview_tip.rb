class InterviewTip < ApplicationRecord
  validates_presence_of :title , :description , :ranking
  validates_uniqueness_of :ranking
end
