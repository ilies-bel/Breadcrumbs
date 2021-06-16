FactoryBot.define do
  factory :geolocation do
    address_id nil
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
  end
end