
require "rails_helper"

RSpec.feature "Courses", type: :feature, js: true do
  context "User land on the welcome page" do
    before { visit "/" }

    subject { page }

    it { is_expected.to have_content("Takes the roles of defense attorneys and investigates cases and defends your clients in court!") }
  end
end
