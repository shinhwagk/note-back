import sys
import os
import json
import pymysql
import io

def insert(p_id,name,con):
  cursor = con.cursor() 
  sql = "INSERT INTO note_back.labels(name,p_id) VALUES(%s, %s)"
  cursor.execute(sql,(name,p_id))
  id = cursor.lastrowid
  con.commit()
  cursor.close
  con.close
  return id

def select(p_id,name,con):
  cur = con.cursor()
  sql = "SELECT id FROM note_back.labels where name = %s and p_id = %s"
  cur.execute(sql, (name,p_id))
  id = -1
  for r in cur.fetchall():
    id = r[0]
  cur.close
  return id

def main(labels,con):
  num = 0
  for label in labels.split('-'):
    ste = select(num,label,con)
    if ste == -1:
      num = insert(num,label,con)
    else:
      num = ste
  return num