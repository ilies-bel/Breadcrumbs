# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController

  def create
    user = User.find_by_email(sign_in_params[:email])

    if user&.valid_password?(sign_in_params[:password])
      json_response(json: { 'token' => user.generate_jwt,  'user' => user })
    else
      json_response(json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity)
    end
  end

end
