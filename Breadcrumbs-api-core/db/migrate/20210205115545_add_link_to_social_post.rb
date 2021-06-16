class AddLinkToSocialPost < ActiveRecord::Migration[6.1]
  def change
    add_column :social_posts, :link , :string
  end
end
