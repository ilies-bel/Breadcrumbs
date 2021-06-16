require 'rails_helper'

RSpec.describe Message, type: :model do
  context 'model' do
    it { should belong_to(:user) }
    it { should belong_to(:message_feed) }


    it { should validate_presence_of(:message_feed) }
    it { should validate_presence_of(:content) }
    it { should validate_presence_of(:created_at) }
    it { should validate_presence_of(:updated_at) }
  end
end
