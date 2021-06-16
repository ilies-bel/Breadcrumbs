class Qualifier < ApplicationRecord
  validates_presence_of :qualifier_name , :select_count
end
