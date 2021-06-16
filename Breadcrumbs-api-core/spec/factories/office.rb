cFactoryBot.define do
  factory :office do
    address_id nil
    name { Faker::Lorem.words }
    is_headquarters { Faker::Boolean }
  end
end