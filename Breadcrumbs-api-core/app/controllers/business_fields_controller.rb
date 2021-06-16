class BusinessFieldsController < ApplicationController

  before_action :set_business_field, only: %i[show update destroy]

  # GET /business_field
  def index
    @business_fields = BusinessField.all
    json_response(@business_fields)
  end

  # POST /business_field
  def create
    @business_field = BusinessField.create!(business_field_params)
    json_response(@business_field, :created)
  end

  # GET /business_field/:id
  def show
    json_response(@business_field)
  end

  # PUT /business_field/:id
  def update
    @business_field.update(business_field_params)
    head :no_content
  end

  # DELETE /business_field/:id
  def destroy
    @business_field.destroy
    head :no_content
  end

  private

  def business_field_params
    # whitelist params
    params.permit(:field_name, :description )
  end

  def set_business_field
    @business_field = BusinessField.find(params[:id])
  end

end
