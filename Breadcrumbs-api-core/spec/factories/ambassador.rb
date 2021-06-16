FactoryBot.define do
  factory :ambassador do
    message_feed_id nil
    collaborator_id nil
    catch_phrase { Faker::Lorem.words }
    description { Faker::Lorem.words }
  end
end