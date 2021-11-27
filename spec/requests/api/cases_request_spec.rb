require 'rails_helper'

RSpec.describe "Api::Cases", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/api/cases/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/api/cases/create"
      expect(response).to have_http_status(:success)
    end
  end

end
