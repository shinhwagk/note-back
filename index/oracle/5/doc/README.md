#### Here the action for fix the issue.
- Remove all spfile from Old ORACLE HOME/dbs (copy them or change there names).
- Remove all from $ORACLE_BASE/cfgtoollogs/dbua * ORACLE_BASE - base directory given by you during software installation
- Re-run the DBUA: cd $ORACLE_HOME/bin; ./dbua
- 检查oracle启动进程是否数据老的oracle home进程，如果是新的oracle home所起的进程那么kill掉他们