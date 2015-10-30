require 'active_record'
require 'yaml'
require 'logger'
require_relative File.expand_path('./app/main.rb')
task :default => :run

desc "Migrate database"
task 'db:migrate' => :environment do
    ActiveRecord::Migrator.migrate('app/db/migrate', ENV["VERSION"] ? ENV["VERSION"].to_i : nil )
end
task 'db:migrate:drop' => :environment do
    ActiveRecord::Migrator.down('app/db/migrate', ENV["VERSION"] ? ENV["VERSION"].to_i : nil )
end
task 'db:migrate:reset' => ['db:migrate:drop','db:migrate']


task :run => :environment do
  setting = YAML.load(File.read('config/setting.yml'))
  setting.each do |k,v|
    ENV[k.to_s] = v.to_s
  end
  Controller.run!
end

task :environment do
  config = YAML.load(File.read('config/database.yml'))
  config[ENV["ENV"]]["database"] = File.expand_path("../app/db/#{config[ENV["ENV"]]["database"]}",__FILE__)
  ActiveRecord::Base.establish_connection(config[ENV['ENV']])
  ActiveRecord::Base.logger = Logger.new('app/db/database.log')
end
