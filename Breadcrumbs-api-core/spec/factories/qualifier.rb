FactoryBot.define do
  factory :ambassador do
    qualifier_name { Faker::Lorem.words }
    select_count { Faker::Number.between(1,1000) }
  end
end