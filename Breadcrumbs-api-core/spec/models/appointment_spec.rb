require 'rails_helper'

RSpec.describe Appointment, type: :model do
  context 'model' do
    it { should belong_to(:interview_milestone)}
    it { should belong_to(:candidate)}
    it { should belong_to(:collaborator)}
    it { should belong_to(:meeting_room)}

    it { should validate_presence_of(:end_time) }
    it { should validate_presence_of(:start_time) }
    it { should validate_presence_of(:is_confirmed) }
    it { should validate_presence_of(:is_completed) }
    it { should validate_presence_of(:note) }
    it { should validate_presence_of(:created_at) }
    it { should validate_presence_of(:updated_at) }
  end
end
