FactoryBot.define do
  factory :message do
    user_id nil
    message_feed_id nil
    content { Faker::Lorem.words(5,20)}
  end
end