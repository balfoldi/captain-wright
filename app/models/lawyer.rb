class Lawyer < ApplicationRecord
  enum avatar: [:mia, :pheonix]

  validates :full_name, presence: true
  validates_uniqueness_of :full_name
  SPEECHCRAFT_LIMITS = { min: 10, max: 100}
  CREDIBILITY_LIMITS = { min: 10, max: 100}
  validates :speechcraft, presence: true, numericality: { in: SPEECHCRAFT_LIMITS[:min]..SPEECHCRAFT_LIMITS[:max] }
  validates :credibility, presence: true, numericality: { in: CREDIBILITY_LIMITS[:min]..CREDIBILITY_LIMITS[:max] }
end
