class AvailabilitiesController < ApplicationController
  before_action :set_availability, only: [:show, :update, :destroy]


  # GET /availability
  def index
    @availabilities = Availability.all
    start_time = params[:after]
    Rails.logger.warn(start_time)
    json_response(@availabilities)
  end

  # POST /availability
  def create
    @availability = Availability.create!(availability_params)
    json_response(@availability, :created)
  end

  # GET /availability/:id
  def show
    json_response(@availability)
  end

  # PUT /availability/:id
  def update
    @availability.update(availability_params)
    head :no_content
  end

  # PUT /availability/:id/move
  def move
    @availability.update(availability_params)
    head :no_content
  end

  # DELETE /availability/:id
  def destroy
    @availability.destroy
    head :no_content
  end


  private


  def find_schedules
    if params[:start_time] || params[:end_time]
      start_time = params[:start_date].DateTime.parse('2001-02-03T04:05:06+07:00')
      @schedules = Availability.find(:all, :conditions => {:end_time => start_time })
    end
  end


  def availability_params
    # whitelist params
    params.permit(:id,:start_time, :end_time)
  end

  def set_availability
    @availability = Availability.find(params[:id])
  end

end
