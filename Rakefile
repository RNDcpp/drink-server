require 'active_record'
require 'yaml'
require 'logger'
require_relative File.expand_path('./app/main.rb')
task :default => :run

desc "Migrate database"
task 'db:migrate' => :environment do
    ActiveRecord::Migrator.migrate('app/db/migrate', ENV["VERSION"] ? ENV["VERSION"].to_i : nil )
end


task :run => :environment do
  Controller.run!  
end

task :environment do
  config = YAML.load(File.read('config/database.yml'))
  config[ENV["ENV"]]["database"] = File.expand_path("../app/db/#{config[ENV["ENV"]]["database"]}",__FILE__)
  ActiveRecord::Base.establish_connection(config[ENV['ENV']])
  ActiveRecord::Base.logger = Logger.new('app/db/database.log')
end
