# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Theme, type: :model do
  context 'Theme model validation' do
    it { should validate_presence_of(:primary_color) }
    it { should validate_presence_of(:logo_url) }
    it { should validate_presence_of(:secondary_color) }
    it { should validate_presence_of(:splash_logo_url) }
  end
end
