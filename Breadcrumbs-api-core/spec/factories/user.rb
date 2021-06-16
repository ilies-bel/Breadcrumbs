FactoryBot.define do
  factory :user do
    first_name { Faker::StarWars.character }
    last_name nil
    profile_picture_id nil
    mail { Faker::Internet.email }
    role { Faker::Lorem.word }
    push_notification { Faker::Boolean }
    mail_notification { Faker::Boolean }
    token { Faker::Lorem.characters }

  end
end