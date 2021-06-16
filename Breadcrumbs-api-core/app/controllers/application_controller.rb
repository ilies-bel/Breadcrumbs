# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include AuthCommon
  include ExceptionHandler
  include Response

  respond_to :json

  skip_before_action :verify_authenticity_token
  before_action :underscore_params!

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user

  private

  def token_decode (token)
    begin
      JWT.decode(token, Rails.application.secrets.secret_key_base).first

    rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError => e
      render json: { status: 'error', code: 4000, message: e }

    end
  end



  def underscore_params!
    params.deep_transform_keys!(&:underscore)
  end


end
