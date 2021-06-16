FactoryBot.define do
  factory :interview_type do
    business_field_id nil
    title { Faker::Lorem.word }
    description { Faker::Lorem.words }
    estimated_time_length { Faker::Number.between(0,5000)}
    min_time_before_next { Faker::Number.between(0,5000)}
  end
end