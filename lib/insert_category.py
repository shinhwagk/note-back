import sys
import os
import json
import pymysql

def select(l_id,name,con):
  cur = con.cursor()
  sql = "SELECT id FROM note_back.categorys where name = %s and l_id = %s"
  cur.execute(sql, (name,l_id))
  id = -1
  for r in cur.fetchall():
    id = r[0]
  cur.close
  return id

def insert(l_id,name,con):
  cur = con.cursor() 
  sql = "INSERT INTO note_back.categorys(name,l_id) VALUES('%s', %s)" % (name,l_id)
  cur.execute(sql)
  id = cur.lastrowid
  con.commit()
  cur.close
  return id

def main(l_id,category,con):
  id = select(l_id,category,con)
  if id == -1:
    id = insert(l_id,category,con)
  return id