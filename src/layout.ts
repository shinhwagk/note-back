import { Category } from "./category.obj";
import { Note } from "./note.obj";
// import { path } from "./main";
import { NoteBack } from './noteback.obj';

export function nav(labels: string[]) {
  const div = document.createElement("div");
  div.className = "labels";
  const ul = document.createElement("ul");
  for (let label of labels) {
    const li = document.createElement("li");
    li.className = "label";
    li.innerText = label;
    ul.appendChild(li);
  }
  div.appendChild(ul);
  return div;
}

export function category_ui(category: Category) {
  const div = document.createElement("div");
  div.innerText = category.name
  return div
}
//   const table = document.createElement("table");
//   table.style.width = "100%";
//   table.style.border = "1"
//   const tr = document.createElement("tr");
//   const td_1 = document.createElement("td");
//   td_1.style.width = "44%"

//   const td_2 = document.createElement("td");
//   td_2.style.width = "44%"

//   for (let i = 0; i <= categorys.length - 1; i += 1) {
//     const c = categorys[i];

//     const col = document.createElement("div");
//     col.innerText = c.name;

//     if (i % 2 == 0) {
//       td_1.appendChild(col);
//     } else {
//       td_2.appendChild(col);
//     }
//   }
//   tr.appendChild(td_1);
//   tr.appendChild(td_2);
//   table.appendChild(tr);
//   return table;
// }

// function parseNote(n: Note, cols: number, f) {
//   const path = location.hash + '/' + n.id
//   const tr = document.createElement("tr")
//   const td_id = document.createElement("td")
//   td_id.innerHTML = n.id.toString()
//   tr.appendChild(td_id)
//   const hc = new HttpClient()
//   for (let i = 1; i <= cols; i += 1) {
//     const td = document.createElement("td")
//     hc.get(path + '/' + i, (x) => {
//       td.innerText = x
//       tr.appendChild(td)
//     })
//   }
//   f(tr)
// }

// function parseCategory(categorys: Category[]) {
//   categorys.map((c: Category) => {
//     c.
//   })
// }