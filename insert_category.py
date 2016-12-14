import sys
import os
import json
import pymysql


def select(l_id,name):
  con = pymysql.connect("10.65.103.48","root","123456aA+","note_back")
  cur = con.cursor()
  sql = "SELECT id FROM note_back.categorys where name = %s and l_id = %s"
  cur.execute(sql, (name,l_id))
  id = -1
  for r in cur.fetchall():
    id = r[0]
  cur.close
  con.close
  return id

def insert(l_id,name):
  conn = pymysql.connect("10.65.103.48","root","123456aA+","note_back" )
  cursor = conn.cursor() 
  sql = "INSERT INTO note_back.categorys(name,l_id) VALUES (%s,%s)"
  cursor.execute(sql, (name,l_id))
  id = cursor.lastrowid
  conn.commit()
  cursor.close
  conn.close
  return id

def insert_category(l_id,category):
  id = 0
  if select(l_id,category) == -1:
    id = insert(l_id,category)
  return id