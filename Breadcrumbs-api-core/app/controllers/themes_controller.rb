class ThemesController < ApplicationController

  before_action :set_theme, only: [:show, :update, :destroy]
  # TODO exclude candidates


  # GET /theme
  def index
    @themes = Theme.all
    json_response(@themes)
  end

  # POST /theme
  def create
    @theme = Theme.create!(theme_params)
    json_response(@theme, :created)
  end

  # GET /theme/:id
  def show
    json_response(@theme)
  end

  # PUT /theme/:id
  def update
    @theme.update(theme_params)
    head :no_content
  end

  # DELETE /theme/:id
  def destroy
    @theme.destroy
    head :no_content
  end


  private

  def theme_params
    # whitelist params
    params.permit(:primary_color, :secondary_color, :splash_logo_url, :logo_url)
  end

  def set_theme
    @theme = Theme.find(params[:id])
  end

end
