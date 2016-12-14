import sys
import insert_labels
import insert_category

args = sys.argv

l_id = -1
c_id = -1
for idx,arg in enumerate(args):
  if arg == '--labels':
    labels = args[idx + 1]
    l_id = insert_labels.inert_labels(labels)
  
  if arg == '--category':
    category = args[idx + 1]
    c_id = insert_category.insert_category(l_id,category)
    print(c_id)

  if arg == '--notes':
    notes = args[idx + 1]

  