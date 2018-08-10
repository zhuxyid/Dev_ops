"""samanage URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from index import views
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^index/',views.index),
    url(r'^dashboard/',views.dashboard),
    url(r'^monitor',views.monitor),
    url(r'^hostmanage',views.hostmanage),
    url(r'^datamanage',views.datamanage),

    url(r'^portmanage',views.portmanage),
    url(r'^checknginx', views.checknginx),
    url(r'notify',views.notify),

    url(r'^deploy',views.deploy),
    url(r'^deployhistory',views.deployhistory),
    url(r'^codehistory',views.codehistory),
    url(r'^code',views.code),

]
