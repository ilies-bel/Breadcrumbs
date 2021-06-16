FactoryBot.define do
  factory :business_title do
    business_field_id nil
    title { Faker::Lorem.word }
    description { Faker::Lorem.words }
  end
end