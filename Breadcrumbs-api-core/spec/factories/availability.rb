FactoryBot.define do
  factory :availability do
    collaborator_id nil
    start_time { Faker::Time.between(from: DateTime.now.change(day: -3), to: DateTime.now.change(day: +15), format: :default) }
    end_time { Faker::Time.between(from: start_time, to: start_time.change(day: +15) , format: :default) }
  end
end