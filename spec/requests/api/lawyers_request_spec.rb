require 'rails_helper'

RSpec.describe "Api::Lawyers", type: :request do
  let(:lawyer) { FactoryBot.create(:lawyer) }

  subject { JSON.parse(response.body, {:symbolize_names => true}) }

  describe "GET /show" do
    let(:lawyer) { FactoryBot.create(:lawyer) }

    before { get api_lawyer_path(lawyer) }

    it { is_expected.to include(id: lawyer.id) }
  end

  describe "GET /index" do
    let!(:lawyers) { [lawyer, FactoryBot.create(:lawyer)] }

    before { get api_lawyers_path }

    it { is_expected.to have_attributes(size: 2) }
  end

  describe "GET /create" do
    let(:params) { { lawyer: { full_name: Faker::Games::ElderScrolls.unique.name, speechcraft: rand(Lawyer::SPEECHCRAFT_LIMITS[:min]..Lawyer::SPEECHCRAFT_LIMITS[:max]), credibility: rand(Lawyer::CREDIBILITY_LIMITS[:min]..Lawyer::CREDIBILITY_LIMITS[:max]) } } }

    before { post api_lawyers_path, params: params }

    it { is_expected.to include(params[:lawyer]) }
  end

  describe "GET /update" do
    let(:params) { { lawyer: { full_name: Faker::Games::ElderScrolls.unique.name, speechcraft: rand(Lawyer::SPEECHCRAFT_LIMITS[:min]..Lawyer::SPEECHCRAFT_LIMITS[:max]), credibility: rand(Lawyer::CREDIBILITY_LIMITS[:min]..Lawyer::CREDIBILITY_LIMITS[:max]) } } }

    before { patch api_lawyer_path(lawyer), params: params }

    it { is_expected.to include(params[:lawyer]) }
  end

  describe "GET /destroy" do
    before { delete api_lawyer_path(lawyer) }

    it { is_expected.to include(id: lawyer.id) }
  end

end
