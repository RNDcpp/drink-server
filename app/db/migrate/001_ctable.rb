class Ctable < ActiveRecord::Migration
public
  def self.up
    create_table :job do |t|
      t.column :order, :integer ,:null=>false
      t.column :status, :integer,:default =>0 
      t.timestamps :null => false
    end
    create_table :head do |t|
      t.column :name, :text
      t.column :port, :integer,:null=>false
      t.timestamps :null => false
    end
  end
  def self.down
    drop_table :job
    drop_table :head
  end
end
