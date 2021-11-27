class Case < ApplicationRecord
  default_scope { order(created_at: :desc)}
  belongs_to :winner, class_name: "Lawyer"
  belongs_to :looser, class_name: "Lawyer"
end
