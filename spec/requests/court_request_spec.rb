require 'rails_helper'

RSpec.describe "Courts", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/court/lawyers"
      expect(response).to have_http_status(:success)
    end
  end

end
