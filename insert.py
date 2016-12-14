import sys
sys.path.append("lib")
import insert_labels
import insert_category
import insert_notes
import pymysql

args = sys.argv

l_id = -1
c_id = -1

con = pymysql.connect("10.65.103.48","root","123456aA+","note_back")

for idx,arg in enumerate(args):
  if arg == '--labels':
    labels = args[idx + 1]
    l_id = insert_labels.main(labels,con)
  
  if arg == '--category':
    category = args[idx + 1]
    c_id = insert_category.main(l_id,category,con)
    print(c_id)

  if arg == '--notes':
    if len(args) == 7:
      notes = args[idx + 1]
      insert_notes.main_1(l_id,notes,con)
    if len(args) == 9:
      notes = args[idx + 1]
      docs = args[idx + 3]
      insert_notes.main_2(l_id,notes,docs,con)
    # if len(args) == 11:
    #   notes = args[idx + 1]
    #   docs = args[idx + 3]
    #   files = args[idx + 5]
    #   insert_notes.main_3(l_id,notes,docs,files,con)

con.close
