class Manage::ManageCandidatesController < ApplicationController
  before_action :set_candidate, only: [ :update, :destroy ]


  def invite
    # TODO authorization collaborator
    @invitation_token = JWT.encode({
                                     role: 'candidate',
                                     business_title_id: params[:business_title_id] ,
                                     interview_process_id: params[:interview_process_id] ,
                                     exp: 2.days.from_now.to_i },
                                   Rails.application.secrets.secret_key_base)

    @url = request.base_url + "/candidate?token=" + @invitation_token

    @jwt_payload = JWT.decode(@invitation_token, Rails.application.secrets.secret_key_base).first

    json_response( "url" => @url, "info" => @jwt_payload)
  end


  def index
    @candidates = Candidate.includes(:user)
    json_response(@candidates.to_json(include: :user))
  end

  def show
    json_response( Candidate.includes(:user).find(params[:id]).to_json(include: :user))
  end


  def update
    @candidate.update(candidate_params)
  end

  def destroy
    @collaborator.destroy
  end



  private


  def set_candidate
    @candidate = Candidate.includes(:user).find(params[:id])
  end


  def candidate_params
    # whitelist params
    params.permit(:business_title_id, :interview_process_id )
  end

end
