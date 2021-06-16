class Manage::ManageMilestonesController < ApplicationController

  before_action :set_milestone, only: [:show, :update, :destroy]


  def index
    @milestones = InterviewMilestone.all
    json_response(@milestones)
  end

  def create
    @milestone = InterviewMilestone.create!(milestone_params)
    json_response(@milestone, :created)
  end

  def show
    json_response(@milestone)
  end

  def show_by_process
    @process_milestone = InterviewMilestone.where(interview_process_id: params[:id])
    json_response(@process_milestone)
  end

  def update
    @milestone.update(milestone_params)
    head :no_content
  end

  def destroy
    InterviewMilestone.find(params[:id]).destroy!
    @milestone.destroy
  end


  private

  def milestone_params
    params.permit(:interview_process_id, :interview_type_id, :milestone_name, :finished)
  end

  def set_milestone
    @milestone = InterviewMilestone.find(params[:id])
  end


end
