require 'base64'
require File.expand_path('../active_record/active_record_base',__FILE__)
class Job < ActiveRecord::Base
  self.table_name = :job
  validates :order, presence: true 
  def order_check
    ret = true
    if (self.order >= (1 << ENV["port_maximum"].to_i)) or (self.order < 1)
      ret = false
    else
      self.order.to_s(2).split().reverse_each.with_index(1) do |e,idx|
        ret = (Head.find_by(port: idx)!=nil) if (e =='1')
      end
    end
    self.errors[:order] = 'is invalid' unless ret
    return ret
  end
end
class Head < ActiveRecord::Base
  self.table_name = :head
  validates :name, presence: true
  validates :port, presence: true,uniqueness: true
  def upload_file(base64_file)
    file_name = File.expand_path("../public/img/head_icon/#{self.port}.png",__FILE__)
    data = File.open(file_name,'w')
    data.write(Base64.decode64(base64_file))
    data.close
  end
end
