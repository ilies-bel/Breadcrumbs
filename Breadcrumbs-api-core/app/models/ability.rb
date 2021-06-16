# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    class Ability
      include CanCan::Ability

      def initialize(user)
        if user.present?  # additional permissions for logged in users (they can manage their posts)
          #can :manage, Post, user_id: user.id
          #
          if user.candidate?  # additional permissions for administrators
            can :read, :all
          end

          if user.collaborator?  # additional permissions for administrators
            can :read, :all
          end

          if user.supervisor?  # additional permissions for administrators
            can :manage, Collaborator
          end

          if user.ambassador?  # additional permissions for administrators
            can :read, :all
          end

          if user.admin?  # additional permissions for administrators
            can :manage, :all
          end


        end
      end
    end
    

  end
end
