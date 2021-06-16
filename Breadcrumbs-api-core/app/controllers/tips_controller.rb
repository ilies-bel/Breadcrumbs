class TipsController < ApplicationController
  before_action :set_tip, only: [:show, :update, :destroy]

  # GET /tips
  def index
    @tips = InterviewTip.all
    json_response(@tips)
  end

  # POST /theme
  def create
    @tip = InterviewTip.create!(tip_params)
    json_response(@tip, :created)
  end

  # GET /theme/:id
  def show
    json_response(@tip)
  end

  # PUT /theme/:id
  def update
    @tip.update(tip_params)
    head :no_content
  end

  # DELETE /theme/:id
  def destroy
    @tip.destroy
    head :no_content
  end


  private

  def tip_params
    # whitelist params
    params.permit(:ranking, :title, :description)
  end

  def set_tip
    @tip = InterviewTip.find(params[:id])
  end

end
