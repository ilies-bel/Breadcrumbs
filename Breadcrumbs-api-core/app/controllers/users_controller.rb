# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :current_user, only: %i[create show update]


  def show
    json_response(@current_user)
  end



  def update
    if current_user.update(user_params)
      json_response(@current_user)
    else
      json_response(json: { errors: current_user.errors }, status: :unprocessable_entity)
    end
  end

  private

  def user_params
    params.require(:user).permit(:password,
                                 :first_name,
                                 :last_name,
                                 :profile_picture,
                                 :push_notification,
                                 :mail_notification)
  end


end
