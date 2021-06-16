class Manage::ManageCollaboratorsController < ApplicationController
  before_action :set_collaborator, only: [ :update, :destroy ]



  def invite
    # TODO: authorization collaborator
    #
    @invitation_token = JWT.encode({
                                     role: 'collaborator',
                                     business_title_id: params[:business_title_id] ,
                                     office_id: params[:office_id] ,
                                     exp: 2.days.from_now.to_i },
                                   Rails.application.secrets.secret_key_base)

    @url = request.base_url + "/collaborators?token=" + @invitation_token


    @jwt_payload = JWT.decode(@invitation_token, Rails.application.secrets.secret_key_base).first

    json_response( "url" => @url, "info" => @jwt_payload)

  end



  def index
    @collaborators = Collaborator.includes(:user)
    json_response(@collaborators.to_json(include: :user))
  end

  def show

    json_response( Collaborator.includes(:user).find(params[:id]).to_json(include: :user))
  end

  def update
    @collaborator.update(collaborator_params)
  end

  def destroy
    @collaborator.destroy
  end



  private

  def collaborator_params
    # whitelist params
    params.permit(:business_title_id, :office_id , :profile_picture_url  )

  end

  def set_collaborator
    @collaborator = Collaborator.includes(:user).find(params[:id])
  end

end
