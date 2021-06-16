require 'rails_helper'

RSpec.describe RestingPlace, type: :model do
  context 'model' do
    it { should belong_to(:office)}
    it { should belong_to(:geolocation)}

    it { should validate_presence_of(:link) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:ranking) }

  end
end
