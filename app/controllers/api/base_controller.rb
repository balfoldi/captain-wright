class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  private
  
  def not_found
    render json: {
      'errors': [
        {
          'status': "404",
          'title': "Not Found",
        },
      ],
    }, status: 404
  end

  def record_invalid(message)
    render json: {
      'errors': [
        {
          'status': "400",
          'title': message,
        },
      ],
    }, status: 400
  end
end
