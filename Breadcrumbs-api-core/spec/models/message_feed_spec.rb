require 'rails_helper'

RSpec.describe MessageFeed, type: :model do
  context 'model' do
    it { should have_one(:ambassador) }
    it { should have_many(:messages) }



    it { should validate_presence_of(:created_at) }
    it { should validate_presence_of(:updated_at) }
  end
end
