FactoryBot.define do
  factory :interview_milestone do
    interview_process_id nil
    interview_type_id nil
    milestone_name { Faker::Lorem.word }
  end
end