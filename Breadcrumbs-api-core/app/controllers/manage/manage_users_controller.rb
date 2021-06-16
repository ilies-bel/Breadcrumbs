class Manage::ManageUsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_users, only: [:show, :update, :destroy]

  def index
    @users_all = User.all
    json_response(@users_all)
  end

  def show
    json_response(@user_one)
  end

  def update
    @user_one.update(user_params)
  end

  def destroy
    @user_one.destroy
  end

  private

  def set_users
    @user_one = User.find(params[:id])
  end

  def user_params
    # whitelist params
    params.permit(:email,
                  :password,
                  :first_name,
                  :last_name,
                  :push_notification,
                  :mail_notification)
  end

end
