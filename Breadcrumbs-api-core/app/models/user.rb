# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: { candidate: 0, collaborator: 1, supervisor: 2, ambassador: 3, admin: 4 }

  def generate_jwt
    JWT.encode({ id: id,
                 exp: 60.days.from_now.to_i },
               Rails.application.secrets.secret_key_base)
  end

  has_one :candidate, dependent: :destroy
  has_one :collaborator, dependent: :destroy
  has_many :contacts
  has_many :messages

  accepts_nested_attributes_for :candidate
  accepts_nested_attributes_for :collaborator

  validates_presence_of :email, :first_name
end
