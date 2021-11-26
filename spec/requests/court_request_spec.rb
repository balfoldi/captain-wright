require 'rails_helper'

RSpec.describe "Courts", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/court/index"
      expect(response).to have_http_status(:success)
    end
  end

end
