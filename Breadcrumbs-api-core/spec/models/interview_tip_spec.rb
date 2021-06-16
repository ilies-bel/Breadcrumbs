require 'rails_helper'

RSpec.describe InterviewTip, type: :model do
  context 'InterviewTip model validation' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:ranking) }

  end
end
