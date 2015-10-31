require File.expand_path('../model_file',__FILE__)
require 'sinatra'
require 'logger'
require 'base64'
class Controller < Sinatra::Base
private
  logger = Logger.new(File.expand_path('../app.log',__FILE__))
  helpers do
    def set_error(message)
      @res[:message] ||= Array.new
      @res[:result]  = 'faild'
      if message.is_a? Array
        @res[:message].concat message
      else
        @res[:message] << message
      end
    end
    def params_require(keys)
      ret = true
      keys.each do |k|
        unless params[k]
          set_error("paramater :#{k.to_s} is required")
          ret = false
        end
      end
      return ret
    end
    def port_valid(p) 
      unless t = (p && ( p.to_i > 0 ) && ( p.to_i <= ENV['port_maximum'].to_i ))
        set_error 'paramater :port is out of range '
      end
      return t
    end
    def find_head
      if params[:id]
        set_error 'paramater :id is invalid' unless  head = Head.find_by(id: params[:id].to_i)
      elsif params[:port]
        set_error 'paramater :port is invalid' unless head = Head.find_by(port: params[:port].to_i)
      else
        set_error 'paramater :id or :port is required'
      end
      return head||=nil
    end
  end 
public
  before %r{/(head|job)} do
    @res = {result: 'success'}
    true
  end

  get '/' do
    erb :index
  end
  
  get '/head' do
    Head.all.to_json
  end
  
  post '/head' do
      if params_require([:name,:port,:data]) && port_valid(params[:port])
        @head = Head.new(name: params[:name],port: params[:port].to_i)
        if @head.valid? && @head.save
          @head.upload_file(params[:data])
        else
          set_error @head.errors.full_messages
        end
      end
    @res.to_json
  end
  
  put '/head' do
    if @head=find_head
      @head.name = params[:name] if params[:name]
      @head.port = params[:port] if params[:port] && port_valid(params[:port])
      if @head.valid? && @head.save
        @head.upload_file(params[:data]) if params[:data]
      else
        set_error @head.errors.full_messages
      end
    end
    @res.to_json
  end
 
  delete '/head' do
    if @head = find_head
      set_error 'faild to delete' unless @head.destroy
    end
    @res.to_json
  end



  get '/job' do
    @jobs = Job.where('status < 2').order('created_at ASC').limit(100)
    @jobs.to_json
  end

  post '/job' do
    unless params_require([:order]) && (@job = Job.new(order: params[:order].to_i)).order_check && @job.valid? && @job.save
      set_error @job.errors.full_messages
    end
    @res.to_json
  end

  put '/job' do
    if @job = Job.find_by(id:params[:id].to_i)
      @job.order = params[:order] if params[:order]
      @job.status = params[:status] if params[:status]
      if @job.valid?
        @job.save!
      else
        set_error @job.errors.full_messages
      end
    else
      set_error 'paramater :id is invalid'
    end
    @res.to_json
  end

  delete '/job' do
    if @job = Job.find_by(id:params[:id].to_i)
      set_error 'faild to delete' unless @job.destroy
    else
      set_error 'paramater :id is invalid'
    end
    @res.to_json
  end
end
