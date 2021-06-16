# frozen_string_literal: true

class InterviewTypesController < ApplicationController
  before_action :set_interview_type, only: %i[show update destroy]

  # GET /theme
  def index
    @interview_types = InterviewType.all
    json_response(@interview_types)
  end

  # POST /theme
  def create
    @interview_type = InterviewType.create!(interview_type_params)
    json_response(@interview_type, :created)
  end

  # GET /theme/:id
  def show
    json_response(@interview_type)
  end

  # PUT /theme/:id
  def update
    @interview_type.update(interview_type_params)
    head :no_content
  end

  # DELETE /theme/:id
  def destroy
    @interview_type.destroy
    head :no_content
  end

  private

  def interview_type_params
    # whitelist params
    params.permit(:business_field_id, :title, :description, :estimated_time_length, :min_time_before_next)
  end

  def set_interview_type
    @interview_type = InterviewType.find(params[:id])
  end
end
