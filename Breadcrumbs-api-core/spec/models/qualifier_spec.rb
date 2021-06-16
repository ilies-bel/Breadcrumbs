require 'rails_helper'

RSpec.describe Qualifier, type: :model do
  context 'Qualifier model validation' do
    it { should validate_presence_of(:qualifier_name) }
    it { should validate_presence_of(:select_count) }

  end
end
