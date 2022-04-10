#  一个基于Nodejs+Express+Mysql开发网课题库API系统

> 使用环境为Linux系统，采用PM2部署方式，默认启动为两个work，双线程。
>
> 建议服务器配置为2核4G的服务器
>
> 注：此项目为2020年的第二版（nodejs+express框架的第一版），第一版为php的单页面已经在CSDN开源。
>
> 另外提供110W条网课题库数据供大家使用，涵盖目前所有的网课类型的答案
>
> 下载地址：[wk_question_new_20220107.sql-MySQL文档类资源-CSDN文库](https://download.csdn.net/download/weixin_43726881/75072223?spm=1001.2014.3001.5503)
>
> 2022年最新的网课题库数据：[2022年最新网课数据11万条，涵盖最新的所有课程-MySQL文档类资源-CSDN文库](https://download.csdn.net/download/weixin_43726881/85105940)

## 二次开发

如果需要此项目二次开发的话，可以使用git将代码拉去到本地，使用vscode，进行二次开发

数据库配置文件在config目录下面的config.js文件中

app.js为项目的入口文件，核心处理代码在router目录下面的static目录中

查看所有API接口在router目录下面的index.js中，其余user文件是用于用户处理的，可忽略，如有个人需求使用可以自行继续开发

项目的启动命令是

```bash
npm start 或者 cnpm start 或者 yarn start
```



## 部署教程

1. 先到config目录下面的config.js中修改数据配置文件

2. 将代码上传到服务器的www目录下面，安装所需要的环境，将文件目录下面的wangke.sql导入数据库即可

3. 安装node环境，通过包管理器安装

   1. 在Ubuntu中，使用如下命令：

   ```bash
   curl -sL https://deb.nodesource.com/setup | sudo bash -
   sudo apt-get install -y nodejs
   ```

   如果需要使用npm安装本地组件，还需要执行如下命令：

   ```bash
   apt-get install -y build-essential
   ```

   2. 在Debian中，使用如下命令：

   ```bash
   apt-get install curl
   curl -sL https://deb.nodesource.com/setup | bash -
   apt-get install -y nodejs
   ```

   如果需要使用npm安装本地组件，还需要执行如下命令：

   ```bash
   apt-get install -y build-essential
   ```

   3. 在RHEL、Fedora、CentOS中，使用如下命令：

   ```bash
   curl -sL https://rpm.nodesource.com/setup | bash -
   yum install -y nodejs
   ```

   如果需要使用npm安装本地组件，还需要执行如下命令：

   ```bash
   yum groupinstall 'Development Tools'
   #下面这行是在Fedora中执行的
   sudo yum install nodejs npm
   #下面这行是在RHEL和CentOS中执行的
   sudo yum install nodejs npm --enablerepo=epel
   ```

   不过实践中，在CentOS6中，执行 

   ```bash
   sudo yum install nodejs npm --enablerepo=epel
   ```

   会报错，而不执行，也可以使用npm。

   4. 在openSUSE和SLE中，使用如下命令：

   ```bash
   sudo zypper ar \
     http://download.opensuse.org/repositories/devel:/languages:/nodejs/openSUSE_13.1/ \
     Node.js
   sudo zypper in nodejs nodejs-devel
   ```

   5. 在Arch Linux中，使用如下命令：

   ```bash
   pacman -S nodejs
   ```

   6. 在FreeBSD和OpenBSD中，使用如下命令：

   ```bash
   /usr/ports/www/node
   cd /usr/ports/www/node-devel/ && make install clean
   #或者
   pkg_add -r node-devel
   pkg install node
   #或者
   pkg install node-devel
   ```

4. 安装PM2管理器

   ```bash
   npm install -g pm2
   ```

5. 安装项目依赖

   ```bash
   npm install 或者 yarn install 或者 cnpm install
   ```

6. 项目部署

   ```bash
   pm2 start ecosystem.config.js
   ```

7. 验证

   访问地址ip+3000/api，出现接口数据返回说明项目启动成功。
   也可以使用命令

   ```bash
   pm2 list
   pm2 monit
   ```

   进行项目的实时监控
   
8. 最后使用nginx配置反向代理，端口是3000代到80，绑定域名即可，这里就不做讲解了，大家可以自信百度解决，新手推荐使用宝塔面板进行部署

## 注意

本项目只用于交流学习使用，如有他用产生后果自负，与作者无关

题库数据库的部分题库数据下载链接

[wk_question_new_20220107.sql-MySQL文档类资源-CSDN文库](https://download.csdn.net/download/weixin_43726881/75072223?spm=1001.2014.3001.5503)
2022年最新的网课题库数据：[2022年最新网课数据11万条，涵盖最新的所有课程-MySQL文档类资源-CSDN文库](https://download.csdn.net/download/weixin_43726881/85105940)

本项目中的/api/cx是配合油猴脚本使用的，目前市面上的所有公开脚本都可以适配只需要修改api接口和传送的相关参数就可以
目前线上使用的是第四版程序，支持微信公众号查体的，支持自定义token使用时长，自定义用户权限等
需要的可以联系我不开源。
本项目已知的漏洞不做修复，有开发能力的可以自行二次开发修复
此版本是Node.js+Express的第一版代码，代码写的烂，勿喷。欢迎使用nodejs开发的大佬前来交流！可以到GitHub主页看到我的联系方式
