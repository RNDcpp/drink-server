import urllib
import urllib2
import json

class DrinkClient:
  def __init__(self,**kwarg):
    self.host = ('host' in kwarg) and kwarg['host'] or 'http://localhost'
    self.port = ('port' in kwarg) and kwarg['port'] or 4567
    self.host = self.host + ':' + str(self.port) + '/'
  

  def _jobReq(self):
    return urllib2.Request(self.host + 'job')

  def _headReq(self):
    return urllib2.Request(self.host + 'head')

  def getJob(self):
    response = urllib2.urlopen(self._jobReq()) 
    return json.loads(response.read())

  def postJob(self,order):
    data = {}
    data['order'] = str(order)
    data = urllib.urlencode(data)
    response = urllib2.urlopen(self._jobReq(),data)
    return json.loads(response.read())
  
  def putJob(self,job_id,**kwarg):
    data = {}
    data['id'] = str(job_id)
    if 'order' in kwarg: data['order'] = kwarg['order']
    if 'status' in kwarg: data['status'] = kwarg['status']
    data = urllib.urlencode(data)
    req = self._jobReq()
    req.get_method = lambda: 'PUT'
    response = urllib2.urlopen(req,data)
    return json.loads(response.read())

  def deleteJob(self,job_id):
    data = {}
    data['id'] = str(job_id)
    data = urllib.urlencode(data)
    req = self._jobReq()
    req.get_method = lambda: 'DELETE'
    response = urllib2.urlopen(req,data)
    return json.loads(response.read())

  def getHead(self,order):
    response = urllib2.urlopen(self._headReq())
    return json.loads(response.read())

  def getIdListFrom(self,order):
    binary_list = list(format(int(order),'b'))
    binary_list.reverse()
    id_list = []
    for i,b in enumerate(binary_list,start = 1):
      if int(b) : id_list.append(i)
    return id_list


