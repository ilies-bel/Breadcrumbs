class CreateMessageFeeds < ActiveRecord::Migration[6.1]
  def change
    create_table :message_feeds do |t|

      t.timestamps
    end
  end
end
