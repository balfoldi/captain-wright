module Api
  class LawyerSerializer < Api::BaseSerializer

    attributes :id, :full_name, :speechcraft, :credibility, :avatar, :level, :experience

  end
end
