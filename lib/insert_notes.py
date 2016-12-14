import pymysql
import json
def main_1(c_id,arg,con):
  ids = arg.split(',')
  arr = []
  for id in ids:
    file = "workspace\%s" % (id)
    f = open(file)
    arr.append(f.read())
    f.close
  str = json.dumps(arr)
  cur = con.cursor()
  sql = "insert into note_back.notes(c_id,data) values(%s,%s)"
  cur.execute(sql,(c_id,str))
  con.commit()

def main_2(c_id,arg,docs,con):
  ids = arg.split(',')
  arr = []
  for id in ids:
    file = "workspace\%s" % (id)
    f = open(file)
    arr.append(f.read())
    f.close
  str = json.dumps(arr)
  cur = con.cursor()
  sql = "insert into note_back.notes(c_id,data,docs) values(%s,%s,%s)"
  docs = "[%s]" % (docs)
  cur.execute(sql,(c_id,str,docs))
  con.commit()
  cur.close

def main_3(c_id,arg,docs,files,con):
  ids = arg.split(',')
  arr = []
  for id in ids:
    file = "workspace\%s" % (id)
    f = open(file)
    arr.append(f.read())
    f.close
  str = json.dumps(arr)
  cur = con.cursor()
  sql = "insert into note_back.notes(c_id,data,docs,files) values(%s,%s,%s,%s)"
  docs = "[%s]" % (docs)
  files = "[%s]" % (files)
  cur.execute(sql,(c_id,str,docs,files))
  con.commit()
  cur.close