import py2_7_client as py_client

def print_list(job_list):
  print('get job list')
  for i in job_list:
    print('id:' + str(i['id']))
    print('status:' + str(i['status']))
    print('order:' + str(i['order']))
    print('')

def print_result(response):
  print('result:' + response['result'])


client = py_client.DrinkClient(host='test',port=80)
print('=use keyword arguments=')
print('host = ' + client.host)
print('port = ' + str(client.port))
print('')

client = py_client.DrinkClient()
print('=default=')
print('host = ' + client.host)
print('port = ' + str(client.port))
print('')

print_result(client.postJob(order='1'))

job_list = client.getJob()
print_list(job_list)

targ_id = job_list[0]['id']
print('target id = ' + str(targ_id))
print('put job order = 1')
print_result(client.putJob(targ_id,order=1))
job_list = client.getJob()
print_list(job_list)


print('put job status = 1')
print_result(client.putJob(targ_id,status=1))
job_list = client.getJob()
print_list(job_list)


print('put job status = 2')
print_result(client.putJob(targ_id,status=2))
job_list = client.getJob()
print_list(job_list)

print('put job status = 0')
print_result(client.putJob(targ_id,status=0))
job_list = client.getJob()
print_list(job_list)

print('delete job')
print_result(client.deleteJob(targ_id))
job_list = client.getJob()
print_list(job_list)

print('convert order 13 = 1101 to list')
id_list = client.getIdListFrom(13)
for i in id_list:
  print('use port:' + str(i))

