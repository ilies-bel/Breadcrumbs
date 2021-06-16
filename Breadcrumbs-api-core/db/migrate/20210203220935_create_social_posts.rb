class CreateSocialPosts < ActiveRecord::Migration[6.1]
  def change
    create_table :social_posts do |t|
      t.datetime :posted_date
      t.string :social_network
      t.string :title
      t.string :headline

      t.timestamps
    end
  end
end
