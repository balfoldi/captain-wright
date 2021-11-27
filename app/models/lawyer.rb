class Lawyer < ApplicationRecord
  enum avatar: [:mia, :pheonix, :miles, :franziska]

  has_many :case_wone, class_name: "Case", foreign_key: "winner_id"
  has_many :case_lost, class_name: "Case", foreign_key: "looser_id"

  before_update :level_up, if: :level_up?

  validates :full_name, presence: true
  validates_uniqueness_of :full_name
  SPEECHCRAFT_LIMITS = { min: 10, max: 100}
  CREDIBILITY_LIMITS = { min: 10, max: 100}
  validates :speechcraft, presence: true, numericality: { in: SPEECHCRAFT_LIMITS[:min]..SPEECHCRAFT_LIMITS[:max] }
  validates :credibility, presence: true, numericality: { in: CREDIBILITY_LIMITS[:min]..CREDIBILITY_LIMITS[:max] }

  def cases
    self.case_wone + self.case_lost
  end

  private

  def level_up?
    self.experience >= 100
  end

  def level_up
    self.level += 1
    self.experience = 0
  end
end
