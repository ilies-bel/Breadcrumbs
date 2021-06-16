require 'rails_helper'

RSpec.describe Availability, type: :model do

  context 'model validation' do
    it { should belong_to(:collaborator)}

    it { should validate_presence_of(:start_time) }
    it { should validate_presence_of(:end_time) }
    it { should validate_presence_of(:created_at) }
    it { should validate_presence_of(:updated_at) }
  end
end
