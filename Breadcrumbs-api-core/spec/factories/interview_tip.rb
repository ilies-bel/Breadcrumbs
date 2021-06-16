FactoryBot.define do
  factory :interview_tip do
    ranking { Faker::Number.between(1,10) }
    title { Faker::Lorem.word }
    description { Faker::Lorem.words }
  end
end