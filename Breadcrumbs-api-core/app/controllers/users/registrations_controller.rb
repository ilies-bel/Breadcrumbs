# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #  super
  #end

  # POST /resource
  def create
    super

    @decoded_token = token_decode(params[:token])
    @role = @decoded_token['role']

    resource.role = @role
    resource.save

    @business_title = @decoded_token['business_title_id']

    case @role
    when 'candidate'

      @process_id = @decoded_token['process_id']

      @new_candidate = @user.create_candidate(interview_process_id: @process_id, business_title_id: @business_title)

    when 'collaborator'

      @office_id = @decoded_token['office_id']
      @new_collaborator = @user.create_collaborator(office_id: @office_id, business_title_id: @business_title)

    when 'supervisor'
      #resource.role = 2
    when 'ambassador'
      #resource.role = 3
    when 'admin'
      #resource.role = 4
    else

    end


  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
