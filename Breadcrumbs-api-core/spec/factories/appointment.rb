FactoryBot.define do
  factory :appointment do
    interview_milestone_id nil
    candidate_id nil
    collaborator_id nil
    meeting_room_id nil
    start_time { Faker::Time.between(from: DateTime.now.change(day: -3), to: DateTime.now.change(day: +15), format: :default) }
    end_time { Faker::Time.between(from: start_time, to: start_time.change(day: +15) , format: :default) }
    note { Faker::Lorem.words }
    is_confirmed { Faker::Boolean }
    is_completed { Faker::Boolean }
  end
end