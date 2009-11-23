# -*- coding: utf-8 -*-
class CreateGroceries < ActiveRecord::Migration
  def self.up
    create_table :groceries do |t|
      t.string :title, :null => false
      t.string :text
      t.string :picture
      t.integer :vote, :default => 0
      t.date :event
      t.string :submitter, :default => "匿名的懦夫"
      t.datetime :submit_date
    end
  end

  def self.down
    drop_table :groceries
  end
end
