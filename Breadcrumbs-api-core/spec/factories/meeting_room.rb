FactoryBot.define do
  factory :meeting_room do
    office_id nil
    name { Faker::Lorem.word }
    how_do_i_get_there { Faker::Lorem.words }
  end
end