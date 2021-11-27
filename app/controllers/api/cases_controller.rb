class Api::CasesController < Api::BaseController
  def index
    render build_objects(Case.all)
  end

  def create
    render build_object_error_managed(Case.create(case_params))
  end

  private

  def case_params
    params.require(:case).permit(:winner_id, :looser_id)
  end
end
