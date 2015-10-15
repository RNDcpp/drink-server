#cording: utf-8
require 'active_record'
require 'pp'
require 'yaml'

config = YAML.load_file(File.expand_path('../../../config/database.yml',__FILE__))
ENV["ENV"]="development" unless config[ENV["ENV"]]
config[ENV["ENV"]]["database"] = File.expand_path("../../db/#{config[ENV["ENV"]]["database"]}",__FILE__)
ActiveRecord::Base.establish_connection(config["development"])

