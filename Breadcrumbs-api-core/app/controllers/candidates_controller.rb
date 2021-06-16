class CandidatesController < ApplicationController
  before_action :authenticate_user!, except: :register
  before_action :set_candidate

  def profile
    json_response(@candidate.to_json(include: :user))
  end

  # POST /candidate
  def register
    begin
      decoded_token = JWT.decode(params[:token], Rails.application.secrets.secret_key_base).first
      @candidate = Candidate.create!(candidate_params) do |c|
        c.user.role = decoded_token['role']
        c.business_title_id = decoded_token['business_title_id']
        c.interview_process_id = decoded_token['interview_process_id']
      end
      json_response(@candidate.to_json(include: :user), :created)
    rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError => e
      render json: { status: 'error', code: 4000, message: e }

    end

  end

  def update
    @candidate.update(collaborator_params)
    # @current_user.update params[:user]
    head :no_content
  end

  # DELETE /collaborators/:id
  def destroy
    @candidate.destroy
    head :no_content
  end

  private

  def candidate_params
    # whitelist params
    params.permit(:interview_process_id, :business_title_id, user_attributes: [:email, :password, :first_name,
                                                                               :last_name, :push_notification, :mail_notification])
  end

  def set_candidate
    @candidate = Candidate.find_by_user_id(@current_user_id)
  end
end
