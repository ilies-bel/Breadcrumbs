class CollaboratorsController < ApplicationController
  before_action :authenticate_user!, except: :register
  before_action :set_collaborator

  # GET /collaborators
  def profile
    json_response(@collaborator.to_json(include: :user))
  end

  # POST /collaborators
  def register

    decoded_token = token_decode(params[:token])
    @collaborator = Collaborator.create!(collaborator_params) do |c|
      c.user.role = decoded_token['role']
      c.office_id = decoded_token['office_id']
      c.business_title_id = decoded_token['business_title_id']
    end

    json_response(@collaborator.to_json(include: :user), :created)

  end

  def update
    @collaborator.update(collaborator_params)
    # @current_user.update params[:user]
    head :no_content
  end

  # DELETE /collaborators/:id
  def destroy
    @collaborator.destroy
    head :no_content
  end

  private

  def collaborator_params
    # whitelist params
    params.permit(:profile_picture_url, :business_title_id, :office_id, user_attributes: [:email,
                                                                                          :password,
                                                                                          :first_name,
                                                                                          :last_name,
                                                                                          :push_notification,
                                                                                          :mail_notification])
  end

  def set_collaborator
    @collaborator = Collaborator.find_by_user_id(@current_user_id)
  end
end
