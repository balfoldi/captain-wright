
require 'rails_helper'

RSpec.feature "LawyerIndex", type: :feature, js: true do
  subject { page }

  describe "lawyer index" do
    context "when a few lawyers exists" do
      let!(:lawyers) { FactoryBot.create_list(:lawyer, 5) }

      before { visit "/court/lawyers" }

      it { lawyers.each { |lawyer| is_expected.to have_content(lawyer.full_name) } }
    end
  end

  describe "lawyer create" do
    context "when a few lawyers exists" do
      let!(:lawyers) { FactoryBot.create_list(:lawyer, 5) }
      let(:full_name) { Faker::Games::ElderScrolls.unique.name }

      before do
        visit "/court/lawyers"
        find(:css, ".navbar-toggler-icon").click if has_css? ".navbar-toggler-icon"
        click_button("Add a lawyer")
        fill_in(:full_name, with: full_name)
        click_button("Submit")
      end

      it { is_expected.to have_content(full_name) }
    end
  end

  describe "lawyer edit" do
    context "when a few lawyers exists" do
      let!(:lawyers) { FactoryBot.create_list(:lawyer, 5) }
      let(:full_name) { Faker::Games::ElderScrolls.unique.name }

      before do
        visit "/court/lawyers"
        find(".card-title", text: lawyers.sample.full_name).click
        find(:css, ".fa-edit", visible: true).click
        fill_in(:full_name, with: full_name)
        click_button("Submit")
      end

      it { is_expected.to have_content(full_name) }
    end
  end

  describe "lawyer delete" do
    context "when a few lawyers exists" do
      let!(:lawyers) { FactoryBot.create_list(:lawyer, 5) }
      let(:full_name) { lawyers.first.full_name }

      before do
        visit "/court/lawyers"
        find(".card-title", text: full_name).click
        find(:css, ".fa-edit", visible: true).click
        click_button("Delete")
        click_button("Yes")
        sleep(1)
      end

      it { is_expected.to_not have_content(full_name) }
    end
  end
end
