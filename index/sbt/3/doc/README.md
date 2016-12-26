###1.在.sbt/下编写一个仓库配置文件
```shell
# cat ~/.sbt/repositories
[repositories]  
  local  
  my-proxy: http://120.24.162.243:8081/nexus/content/groups/public
```