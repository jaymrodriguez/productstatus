class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.text :story
      t.references :epic
      t.references :team
      t.references :goal
      t.references :area
      t.integer :wag
      t.date :eta
      t.date :actual
      t.references :status
      t.text :comments

      t.timestamps
    end
    
    add_index :stories, :epic_id
    add_index :stories, :team_id
    add_index :stories, :goal_id
    add_index :stories, :area_id
    add_index :stories, :status_id
    
  end
end
