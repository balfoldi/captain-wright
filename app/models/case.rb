class Case < ApplicationRecord
  belongs_to :winner, class_name: "Lawyer"
  belongs_to :looser, class_name: "Lawyer"
end
