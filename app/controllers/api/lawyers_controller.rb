class Api::LawyersController < Api::BaseController
  before_action :set_lawyer, only: [:show, :update, :destroy]

  def show
    render build_object(@lawyer)
  end

  def index
    render build_objects(Lawyer.all)
  end

  def create
    render build_object_error_managed(Lawyer.create(lawyer_params))
  end

  def update
    @lawyer.update(lawyer_params)
    render build_object_error_managed(@lawyer)
  end

  def destroy
    render build_object(@lawyer.destroy)
  end

  private

  def lawyer_params
    params.require(:lawyer).permit(:full_name, :speechcraft, :credibility, :avatar, :level, :experience)
  end

  def set_lawyer
    @lawyer = Lawyer.find(params[:id])
  end
end
