require 'base64'
require File.expand_path('../active_record/active_record_base',__FILE__)
class Job < ActiveRecord::Base
  self.table_name = :job
end
class Head < ActiveRecord::Base
  self.table_name = :head
  def upload_file(base64_file)
    file_name = File.expand_path("../public/img/head_icon/#{self.id}.png",__FILE__)
    data = File.open(file_name,'w')
    data.write(Base64.decode64(base64_file))
  end 
end
