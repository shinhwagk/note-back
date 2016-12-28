###安装schema编译环境
```shell
apt install racket
```

###配置emacs
```elisp
(require 'cmuscheme)

(setq scheme-program-name "racket")
```

###运行
```text
M-X:run-scheme
```