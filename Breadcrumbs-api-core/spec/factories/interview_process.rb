FactoryBot.define do
  factory :interview_process do
    process_name { Faker::Lorem.word }
  end
end