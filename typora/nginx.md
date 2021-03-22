# Nginx

## 1、概念

1、是一个高性能的http及反向代理服务器；
2、基于事件驱动，占用很少资源，支持更多并发；
3、安装简单、配置灵活；
4、多进程（单线程）、IO多路复用；

## 2、基本命令

1、nginx -s reopen：重启；
2、nginx -s reload：重新加载配置文件；
3、nginx -s stop：强制停止服务；
4、nginx -s quit：处理完所有请求后停止服务；
5、nginx -t：检测配置文件是否有错误，然后退出；
6、nginx -T：检测配置文件是否有错误，转储并退出；
7、nginx -c filename：设置配置文件；
8、nginx -v：版本信息；
9、nginx -?,-h：帮助信息；
10、nginx -g directives：设置配置文件外的全局指令；
11、killall nginx：杀死所有nginx进程；

## 3、配置项

### 3.1、worker

worker_processes：推荐等同cpu核心数，过多则增加上下文切换消耗；

### 3.2、events

use：kqueue、rtsig、epoll、/dev/poll、select、poll；
worker_connections：最大连接数；

### 3.3、http

server：服务配置
	=>  listen：监听端口；
	=>  server_name：主机名，可用作虚拟主机；
	=>  gzip及其他：压缩；
	=>  keepalive_timeout：长连接时间；
	=>  access_log：日志；
	=>  location：定位配置；
	=>  proxy：反向代理
		=>  proxy_pass：代理地址；
		=>  proxy_redirect：转发；
		=>  proxy_protocol：协议；
		=>  proxy_set_header：代理头；

upstream：负载均衡
	=>  server：轮询，即Round Robin；
	=>  server：weight，即权重；
	=>  ip_hash：同一客户端的请求会被分发到同一服务器进行处理；
	=>  fair：按响应时间进行分配；
	=>  url_hash：同一url的请求会被分发到同一服务进行处理；

## 4、问题

### 4.1、惊群

原因：

1、父进程通过socket创建一个文件描述符用来监听，fork出的子进程将继承父进程的socket文件描述符，之后子进程accept之后将创建已连接描述符与客户端通信；
2、所有子进程都继承父进程的socket文件描述符，那么当连接进来，所有子进程都将收到通知并争着建立连接，造成大量进程被激活又被挂起，只有一个进程可以accept到连接；

处理：

1、相对于apache服务器动辄成百上千的线程/进程，如果发生惊群的话，影响较大，而nginx的worker数量一般也就是cpu核心数，影响较小；
2、高版本的linux中，accept不存在惊群现象，但是epoll_wait等操作还存在；
3、accept_mutex：accept之前需要获取锁，避免惊群现象，低版本默认是打开的，高版本默认是关闭的（Linux优化）；



