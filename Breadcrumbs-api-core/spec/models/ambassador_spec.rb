require 'rails_helper'

RSpec.describe Ambassador, type: :model do
  context 'Ambassador model validation' do
    it { should belong_to(:collaborator)}
    it { should belong_to(:message_feed)}

    it { should validate_presence_of(:catch_phrase) }
    it { should validate_presence_of(:description) }

  end
end
