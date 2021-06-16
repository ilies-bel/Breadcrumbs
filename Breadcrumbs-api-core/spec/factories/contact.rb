FactoryBot.define do
  factory :contact do
    user_id nil
    social_network { Faker::Lorem.words }
    title { Faker::Lorem.word }
    link { Faker::Internet.link }
    logo_id { Faker::Number }
  end
end