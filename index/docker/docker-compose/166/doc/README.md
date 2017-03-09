```yml
version: "2"

services:
  http:
    image: katacoda/docker-http-server
    networks:
      nnn:
       aliases:
         - ddd
  os:
    image: centos
    networks:
      - nnn
    command: "sh -c 'while true;do sleep 1; done'"

networks:
  nnn:
```

> ps:定义一个网络nnn,把service os和http加入到nnn网络，并把http服务在这个nnn网络中起一个别名ddd，供其他服务(OS)使用.

```shell
docker-compose up -d
docker-compose scale http=3
[root@localhost test2]# docker-compose exec os sh -c 'curl http://ddd'
<h1>This request was processed by host: f30624e17b1c</h1>
[root@localhost test2]# docker-compose exec os sh -c 'curl http://ddd'
<h1>This request was processed by host: 48bd00d7d383</h1>
```