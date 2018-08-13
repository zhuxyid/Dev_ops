from django.shortcuts import render,HttpResponse
import paramiko
import json,requests
# Create your views here.

def index(request):
    return render(request,'console.html',locals())

def dashboard(request):
    return render(request,'samanage/dashboard.html',locals())

def monitor(request):
    return render(request,'samanage/monitor.html',locals())

def hostmanage(request):
    return render(request,'samanage/hostmanage.html',locals())

def datamanage(request):
    return render(request,'samanage/datamanage.html',locals())


#nginx反向代理
def portmanage(request):
    if request.method == "POST":
        nginx_ip = request.POST.get('nginx_ip')
        nginx_log = request.POST.get('nginx_log')
        proxy_server = request.POST.get('proxy_server')
        project_name = request.POST.get('project_name')
        domain = request.POST.get('domain')
        nginx_conf_temp = '''
        ####{project}.sanqimei.com
        upstream {project} {{
            server {proxy_server};}}
        server {{
            listen       {port};
            server_name  {servername}.sanqimei.com;
            access_log  {access_log}  main;
            location / {{
                index  index.html index.htm;
                proxy_pass http://{project};
            }}
        }}'''.format(project=project_name,proxy_server=proxy_server,port=80,servername=domain,
                     access_log=nginx_log)
        print(nginx_conf_temp)
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy)
        ssh.connect(hostname='47.52.164.96',username='',password='')
        stdin,stdout,stderr = ssh.exec_command('cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf-`date +%F_%H:%M:%S` && echo "{}" > /etc/nginx/temp.conf && sed -i "/devops-setting-0000/r /etc/nginx/temp.conf" /etc/nginx/nginx.conf'.format(nginx_conf_temp))
        #'''devops-setting-0000 需要在nginx配置文件中创建，下次通过这个点来添加nginx配置文件'''
        print(stderr.read().decode())
        ssh.close()
        return HttpResponse('配置文件添加成功')
    else:
        return render(request,'samanage/portmanage.html',locals())

def ssh_check(args):
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy)
    ssh.connect(hostname='47.52.164.96', username='', password='')
    stdin, stdout, stderr = ssh.exec_command(args)
    message = stderr.read().decode()
    ssh.close()
    return message

def checknginx(request):
    funct = request.POST.get('funct')
    if funct == 'checknginx':
        ret = ssh_check('nginx -t')
        if 'ok' in ret:
            return HttpResponse('配置文件格式正确')
        else:
            return HttpResponse('配置文件格式有问题\nERROR:\n{}'.format(ret))
    if funct == 'reloadnginx':
        ret = ssh_check('nginx -s reload')
        if 'nginx.pid' in ret:
            return HttpResponse('Nginx未启动')
        if ret:
            return HttpResponse('重载出错,请检查nginx配置文件\nERROR:\n{}'.format(ret))
        else:
            return HttpResponse('重载成功')
    if funct == 'rebotnginx':
        killret = ssh_check('killall nginx')
        startret = ssh_check('nginx')
        if startret:
            return HttpResponse('nginx重启出错\nERROR:\n{}'.format(startret))
        else:
            return HttpResponse('nginx重启成功')
    if funct == 'stopnginx':
        ret = ssh_check('killall nginx')
        return HttpResponse('nginx已经关闭')
    if funct == 'startnginx':
        ret = ssh_check('nginx')
        if 'already' in ret:
            return HttpResponse('nginx进程已经启动')
        elif ret:
            return HttpResponse('nginx启动出错\nERROR:\n{}'.format(ret))
        else:
            return HttpResponse('nginx已经开启')
    return render(request,'samanage/portmanage.html',locals())

#通知
def notify(request):
    information = request.POST.get('information')
    webhook="https://oapi.dingtalk.com/robot/send?access_token=1717e210d6c0a0b3b917593d05716a3a44682483f33c3f4735b1b15ea6092234"
    header = {
        "Content-Type": "application/json",
        "charset": "utf-8"
    }
    sourdata = {
        "msgtype": "text",
        "text": {
            "content": ""
        }
    }
    sourdata['text']['content']=information
    sendData=json.dumps(sourdata)
    print(sendData)
    requests.post(webhook,data=sendData,headers=header)
    return render(request,'samanage/portmanage.html')


def deployhistory(request):
    return render(request,'deploymanage/deployhistory.html',locals())

def deploy(request):
    return render(request,'deloymanage/deploy.html',locals())

def codehistory(request):
    return render(request,'codemanage/codehistory.html',locals())

def code(request):
    return render(request,'codemanage/code.html',locals())

