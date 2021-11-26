
require 'rails_helper'

RSpec.feature "WelcomePage", type: :feature, js: true do
  describe "welcome page" do
    context "User land" do
      let!(:lawyers) { FactoryBot.create_list(:lawyer, 5) }

      before { visit "/court/lawyers" }

      subject { page }

      it { lawyers.each { |lawyer| is_expected.to have_content(lawyer.full_name) } }
    end
  end
end
