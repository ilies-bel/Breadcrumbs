FactoryBot.define do
  factory :social_post do
    posted_date { Faker::Time }
    social_network { Faker::DcComics.character }
    title { Faker::Lorem.word }
    headline { Faker::Lorem.words }
    link { Faker::Internet.url }
  end
end