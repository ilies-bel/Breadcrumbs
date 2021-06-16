require 'rails_helper'

RSpec.describe Geolocation, type: :model do
  context 'Geolocation model validation' do
    it { should belong_to(:address)}
    it { should have_many(:resting_places)}

    it { should validate_presence_of(:latitude) }
    it { should validate_presence_of(:longitude) }

  end
end
