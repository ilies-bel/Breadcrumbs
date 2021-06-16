class ProcessesController < ApplicationController
  before_action :authenticate_user!
  before_action :current_candidate


  def index
    @candidate_process_id = @current_candidate.interview_process_id
    @process_milestone = InterviewMilestone.where(interview_process_id: @candidate_process_id)
    json_response(@process_milestone)
  end

end
