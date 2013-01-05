# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120823025554) do

  create_table "areas", :force => true do |t|
    t.string   "area"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "epics", :force => true do |t|
    t.string   "epic"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "goals", :force => true do |t|
    t.string   "goal"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "statuses", :force => true do |t|
    t.string   "status"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "stories", :force => true do |t|
    t.text     "story"
    t.integer  "epic_id"
    t.integer  "team_id"
    t.integer  "goal_id"
    t.integer  "area_id"
    t.integer  "wag"
    t.date     "eta"
    t.date     "actual"
    t.integer  "status_id"
    t.text     "comments"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "stories", ["area_id"], :name => "index_stories_on_area_id"
  add_index "stories", ["epic_id"], :name => "index_stories_on_epic_id"
  add_index "stories", ["goal_id"], :name => "index_stories_on_goal_id"
  add_index "stories", ["status_id"], :name => "index_stories_on_status_id"
  add_index "stories", ["team_id"], :name => "index_stories_on_team_id"

  create_table "teams", :force => true do |t|
    t.string   "team"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
