class Lawyer < ApplicationRecord
  enum avatar: [:mia, :pheonix]

  validates :full_name, presence: true
  validates_uniqueness_of :full_name
  SPEECHCRAFT_LIMITS = { min: 5, max: 20}
  CREDIBILITY_LIMITS = { min: 100, max: 500}
  validates :speechcraft, presence: true, numericality: { in: SPEECHCRAFT_LIMITS[:min]..SPEECHCRAFT_LIMITS[:max] }
  validates :credibility, presence: true, numericality: { in: CREDIBILITY_LIMITS[:min]..CREDIBILITY_LIMITS[:max] }
end
