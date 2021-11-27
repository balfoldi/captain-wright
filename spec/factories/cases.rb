FactoryBot.define do
  factory :case do
    winner { FactoryBot.create(:lawyer) }
    looser { FactoryBot.create(:lawyer) }
  end
end
