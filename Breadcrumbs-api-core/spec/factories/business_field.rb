FactoryBot.define do
  factory :business_field do
    field_name{ Faker::Lorem.word }
    description { Faker::Lorem.words }
  end
end