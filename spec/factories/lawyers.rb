FactoryBot.define do
  factory :lawyer do
    full_name { Faker::Games::ElderScrolls.first_name }
    speechcraft { rand(Lawyer::SPEECHCRAFT_LIMITS[:min]..Lawyer::SPEECHCRAFT_LIMITS[:max]) }
    credibility { rand(Lawyer::CREDIBILITY_LIMITS[:min]..Lawyer::CREDIBILITY_LIMITS[:max]) }
  end
end
