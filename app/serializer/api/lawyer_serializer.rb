module Api
  class LawyerSerializer < Api::BaseSerializer

    attributes :id, :full_name, :speechcraft, :credibility, :avatar, :level, :experience, :victory_ratio

    def victory_ratio
      object.cases.length > 0 ? (object.case_wone.length * 100) / object.cases.length : 50
    end
  end
end
