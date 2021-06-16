FactoryBot.define do
  factory :address do
    street_number { Faker::Address.building_number }
    street_name { Faker::Address.street_name }
    street_type { Faker::Address.street_suffix }
    zip_code { Faker::Address.zip_code }
    city { Faker::Address.city }
    country { Faker::Address.country }
  end
end
