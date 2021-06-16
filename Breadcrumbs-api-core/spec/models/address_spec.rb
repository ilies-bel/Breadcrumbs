require 'rails_helper'

RSpec.describe Address, type: :model do
  context 'Address model validation' do
    it { should have_one(:geolocation)}
    it { should have_one(:office)}

    it { should validate_presence_of(:street_number) }
    it { should validate_presence_of(:street_name) }
    it { should validate_presence_of(:street_type) }
    it { should validate_presence_of(:zip_code) }
    it { should validate_presence_of(:city) }
    it { should validate_presence_of(:country) }
  end
end
