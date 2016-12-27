### 1 下载openssl， www.openssl.org
### 2 配置
```shell
./config --prefix=/opt/openssl --openssldir=/opt/openssl enable-ec_nistp_64_gcc_128
```
- enable-ec_nistp_64_gcc_128：这个参数可以添加一些优化的椭园曲线算法
### 3 安装
```shell
make depend
make
make install
```

### 4 目录
- private 目录存放私钥
- certs