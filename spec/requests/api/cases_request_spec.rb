require 'rails_helper'

RSpec.describe "Api::Cases", type: :request do
  subject { JSON.parse(response.body, {:symbolize_names => true}) }

  describe "GET /index" do
    let!(:cases) { [FactoryBot.create_list(:case, 4)] }

    before { get api_cases_path }

    it { is_expected.to have_attributes(size: 4) }
  end

  describe "GET /create" do
    let(:looser) { FactoryBot.create(:lawyer) }
    let(:winner) { FactoryBot.create(:lawyer) }
    let(:params) { { case: { winner_id: winner.id, looser_id: looser.id } } }

    before { post api_cases_path, params: params }

    it { is_expected.to include(params[:case]) }
  end

end
