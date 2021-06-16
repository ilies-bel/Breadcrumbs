FactoryBot.define do
  factory :ambassador do
    office_id nil
    geolocation_id nil
    ranking { Faker::Number.between(0,10) }
    title { Faker::Lorem.word }
    link { Faker::Internet.url }
    description { Faker::Lorem.words }
  end
end