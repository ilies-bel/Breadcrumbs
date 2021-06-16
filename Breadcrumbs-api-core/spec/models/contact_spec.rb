require 'rails_helper'

RSpec.describe Contact, type: :model do
  context 'Contact model validation' do
    it { should belong_to(:user)}

    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:link) }
    it { should validate_presence_of(:social_network) }

  end
end
