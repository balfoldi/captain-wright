
require 'rails_helper'

RSpec.feature "LawyerIndex", type: :feature, js: true do
  describe "lawyer index" do
    context "when a few lawyers exists" do
      let!(:lawyers) { FactoryBot.create_list(:lawyer, 5) }

      before { visit "/court/lawyers" }

      subject { page }

      it { lawyers.each { |lawyer| is_expected.to have_content(lawyer.full_name) } }
    end
  end

  describe "lawyer create" do
    context "when a few lawyers exists" do
      let!(:lawyers) { FactoryBot.create_list(:lawyer, 5) }
      let(:full_name) { Faker::Games::ElderScrolls.unique.name }

      before do
        visit "/court/lawyers"
        click_button("Add a lawyer")
        fill_in(:full_name, with: full_name)
        click_button("Submit")
      end

      subject { page }

      it { is_expected.to have_content(full_name) }
    end
  end

  describe "lawyer edit" do
    context "when a few lawyers exists" do
      let!(:lawyers) { FactoryBot.create_list(:lawyer, 5) }
      let(:full_name) { Faker::Games::ElderScrolls.unique.name }

      before do
        visit "/court/lawyers"
        find_all(:css, ".card", wait: 10).first.click
        find_all(:css, ".fa-edit").first.click
        fill_in(:full_name, with: full_name)
        click_button("Submit")
      end

      subject { page }

      it { is_expected.to have_content(full_name) }
    end
  end

  describe "lawyer delete" do
    context "when a few lawyers exists" do
      let!(:lawyers) { FactoryBot.create_list(:lawyer, 5) }
      let(:full_name) { lawyers.first.full_name }

      before do
        visit "/court/lawyers"
        find_all(:css, ".card", wait: 10).first.click
        find_all(:css, ".fa-edit").first.click
        click_button("Delete")
        click_button("Yes")
      end

      subject { page }
      it { is_expected.to_not have_content(full_name) }
    end
  end
end
