ENV["GOROKU_ENV"] = "test"
require File.expand_path('../model_file',__FILE__)
require 'sinatra'
require 'logger'
require 'base64'
class Controller < Sinatra::Base
private
  logger = Logger.new(File.expand_path('../app.log',__FILE__))
public
  get '/' do
    @head = Head.new
    pp @head
    erb :index
  end
  delete '/head' do
    response = Hash.new
    @head = Head.find_by(id: params['id'].to_i)
    if @head.destroy
      response[:result] = "success"
    else
      response[:result] = "faild"
    end
    response.to_json
  end
  get '/head' do
    Head.all.to_json
  end
  put '/head' do
    response = Hash.new
    begin
      @head = Head.find_by(id: params['id'].to_i)
      if(@head)
        @head.name = params['name']
        @head.upload_file(params['data']) if params['data']
        @head.save!
        response[:result] = 'success'
      else
        raise"this id is invalid"
      end
    rescue => e
      p response[:result] = e.message
      logger.fatal(e)
    end
    response.to_json
  end

  post '/head' do
    response=Hash.new
    begin
      @head = Head.create!(name: params['name'])
      @head.upload_file(params['data']) if params['data']
      response[:result] = "success"
    rescue => e
      p response[:result] = e.message
      logger.fatal(e)
    end
    response.to_json
  end
  get '/job' do
    @jobs = Job.all.order('created_at DESC').limit(100)
    @jobs.to_json
  end

  post '/job' do
    response=Hash.new
    if Job.create(params)
      response[:result] = "success"
    else
      response[:result] = "faild"
    end
    response.to_json
  end

  put '/job' do
    response=Hash.new
    begin
      @job = Job.find_by(id:params["id"])
      @job.order = params["order"] if params["order"]
      @job.status = params["status"] if params["status"]
      @job.save!
      response[:result] = "success"
    rescue=>e
      response[:result] = e.message
      logger.fatal(e)
    end
    response.to_json
  end
  delete '/job' do
    @job = Job.find_by(id:params['id'].to_i)
    @job.destroy
  end
end
