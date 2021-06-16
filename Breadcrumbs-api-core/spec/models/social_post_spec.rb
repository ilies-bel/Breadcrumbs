require 'rails_helper'

RSpec.describe SocialPost, type: :model do
  context 'SocialPost model validation' do
    it { should validate_presence_of(:social_network) }
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:headline) }
    it { should validate_presence_of(:created_at) }
    it { should validate_presence_of(:updated_at) }
  end
end
