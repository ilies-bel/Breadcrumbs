# frozen_string_literal: true

class Theme < ApplicationRecord
  validates_presence_of :primary_color, :logo_url, :secondary_color, :splash_logo_url
end
