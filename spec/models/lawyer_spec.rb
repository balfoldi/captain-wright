require 'rails_helper'

RSpec.describe Lawyer, type: :model do
  describe "lawyer" do
    subject { FactoryBot.create(:lawyer) }

    it { is_expected.to be_valid }
  end
end
