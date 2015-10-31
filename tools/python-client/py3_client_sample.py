import py3_client as py_client

def print_list(job_list):
  print('get job list')
  for i in job_list:
    print(('id:' + str(i['id'])))
    print(('status:' + str(i['status'])))
    print(('order:' + str(i['order'])))
    print('')

def print_result(response):
  print(('result:' + response['result']))


client = py_client.DrinkClient(host='test',port=80)
#DrincClient(host,port)
print('=use keyword arguments=')
print(('host = ' + client.host))
print(('port = ' + str(client.port)))
print('')

client = py_client.DrinkClient()
print('=default=')
print(('host = ' + client.host))
print(('port = ' + str(client.port)))
print('')

print_result(client.postJob(order='1'))
#postJob(order)
job_list = client.getJob()
print_list(job_list)

targ_id = job_list[0]['id']
print(('target id = ' + str(targ_id)))
print('put job order = 1')
print_result(client.putJob(targ_id,order=1))
job_list = client.getJob()
#getJob
#[{id:num,status:num,order:num}]
print_list(job_list)


print('put job status = 1')
print_result(client.putJob(targ_id,status=1))
#putJob(target_id = num,status=num,order=num) -> change Job with id:target_id
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
#deleteJob(target_id:num) -> delete job with id:target_id
job_list = client.getJob()
print_list(job_list)

print('convert order 13 = 1101 to list')
id_list = client.getIdListFrom(13)
#getIdList(number) -> [num,num,...]
for i in id_list:
  print(('use port:' + str(i)))

