module Api
  class CaseSerializer < Api::BaseSerializer

    attributes :id, :winner_id, :looser_id

  end
end
