class Lawyer < ApplicationRecord
  enum avatar: [:mia, :pheonix]

  has_many :case_wone, class_name: "Case", foreign_key: "winner_id"
  has_many :case_lost, class_name: "Case", foreign_key: "looser_id"

  validates :full_name, presence: true
  validates_uniqueness_of :full_name
  SPEECHCRAFT_LIMITS = { min: 10, max: 100}
  CREDIBILITY_LIMITS = { min: 10, max: 100}
  validates :speechcraft, presence: true, numericality: { in: SPEECHCRAFT_LIMITS[:min]..SPEECHCRAFT_LIMITS[:max] }
  validates :credibility, presence: true, numericality: { in: CREDIBILITY_LIMITS[:min]..CREDIBILITY_LIMITS[:max] }
end
