
require 'rails_helper'

RSpec.feature "WelcomePage", type: :feature, js: true do
  describe "welcome page" do
    context "User land" do
      before { visit "/" }

      subject { page }

      it { is_expected.to have_content("Takes the roles of defense attorneys and investigates cases and defends your clients in court!") }
    end
  end
end
