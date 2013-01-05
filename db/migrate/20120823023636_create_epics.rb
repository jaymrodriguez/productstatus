class CreateEpics < ActiveRecord::Migration
  def change
    create_table :epics do |t|
      t.string :epic

      t.timestamps
    end
  end
end
