import sys
import os
import json
import pymysql

# import MySQLdb

def insert(p_id,name):
  conn = pymysql.connect("10.65.103.48","root","123456aA+","note_back" )
  cursor = conn.cursor() 
  sql = "INSERT INTO note_back.labels(name,p_id) VALUES (%s,%s)"
  cursor.execute(sql, (name,p_id))
  id = cursor.lastrowid
  conn.commit()
  cursor.close
  conn.close
  return id

def select(p_id,name):
  con = pymysql.connect("10.65.103.48","root","123456aA+","note_back")
  cur = con.cursor()
  sql = "SELECT id FROM note_back.labels where name = %s and p_id = %s"
  cur.execute(sql, (name,p_id))
  id = -1
  for r in cur.fetchall():
    id = r[0]
  cur.close
  con.close
  return id

def inert_labels(labels):
  num = 0
  for label in labels.split('-'):
    ste = select(num,label)
    if ste == -1:
      num = insert(num,label)
    else:
      num = ste
  return num


# template_add_labels = {"labels": ""};
# template_add_category = {"labels": "", "category": ""};
# template_add_notes = {"labels": "", "category": "", "notes": {"id": 0, "content":[],"docs":[],"file":[]}};

# if len(os.listdir("workspace")) >= 1:
#   print("workspace has file exist")
#   sys.exit(1) 

# operation = sys.argv[1]



# if operation == 'add-labels':
#   f = open("workspace\\add-labels.json","w")
#   f.write(json.dumps(template_add_labels))
#   f.close

# if operation == 'add-category':
#   f = open("workspace\\add-category.json","w")
#   f.write(json.dumps(template_add_category))
#   f.close

# if operation == 'add-notes':
#   f = open("workspace\\add-notes.json","w")
#   f.write(json.dumps(template_add_notes))
#   f.close