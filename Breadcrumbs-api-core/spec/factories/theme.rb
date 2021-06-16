FactoryBot.define do
  factory :theme do
    primary_color { Faker::Color.hex_color }
    secondary_color { Faker::Color.hex_color }
    logo_url { Faker::Internet.url  }
    splash_logo_url { Faker::Internet.url  }
  end
end