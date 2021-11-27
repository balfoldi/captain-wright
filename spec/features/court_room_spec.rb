
require 'rails_helper'

RSpec.feature "CourtRoom", type: :feature, js: true do
  subject { page }

  describe "lawys index to victory flow" do
    context "one lawyer win" do
      let(:lawyers) { FactoryBot.create_list(:lawyer, 5) }
      let(:lawyer_winner) { lawyers.sample }
      let(:lawyer_looser) { lawyers.sample }

      before do
        lawyer_winner.update(speechcraft: 100, credibility: 100)
        lawyer_looser.update(speechcraft: 10, credibility: 10)
        visit "/court/lawyers"
        find(:css, ".navbar-toggler-icon").click if has_css? ".navbar-toggler-icon"
        find(".card-title", text: lawyer_winner.full_name).click
        click_button("Next player")
        find(".card-title", text: lawyer_looser.full_name).click
        click_button("Go to court!")
        find_all(".card-title").map(&:text).each do |title|
          find(".card-title", text: title).click
        end
        click_button("GO TO COURT ROOM!")
        sleep(5)
        # while has_button?("Tell the truth") do
        #   click_button("Tell the truth")
        # end
      end

      it{
        # is_expected.to_not have_css(".h5", text: lawyer_looser.full_name)
        # is_expected.to have_css(".h5", text: lawyer_winner.full_name)
       }
    end
  end
end
