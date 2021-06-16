class Manage::ManageProcessesController < ApplicationController
  before_action :set_process, only: [:show, :update, :destroy]


  # GET /theme
  def index
    @processes = InterviewProcess.all
    json_response(@processes)
  end


  def show
    json_response(@process)
  end


  def create
    @process = InterviewProcess.create!(process_params)
    json_response(@process, :created)
  end



  def update
    @process.update(process_params)
    head :no_content
  end

  def destroy
    @process.destroy
  end


  private

  def process_params
    # whitelist params
    params.permit(:process_name)
  end

  def set_process
    @process = InterviewProcess.find(params[:id])
  end


end
