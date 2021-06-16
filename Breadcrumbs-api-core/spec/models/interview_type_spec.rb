require 'rails_helper'

RSpec.describe InterviewType, type: :model do
  context 'InterviewType model validation' do

    it { should belong_to(:business_field) }
    it { should have_many(:interview_milestones) }


    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:estimated_time_length) }
    it { should validate_presence_of(:min_time_before_next) }

  end
end
