import { Category } from "./category.obj";
import { Note } from "./note.obj";
import { HttpClient } from "./http-client";
import { path } from "./main"

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

export function categorys(categorys: Category[]) {
  for (let c of categorys) {
    const category = document.createElement("div");
    category.className = "category";

    const categoryName = document.createElement("div");
    categoryName.className = "category-header";
    categoryName.innerText = c.name;

    const categoryNotes = document.createElement("div");
    categoryName.className = "category-body";

    category.appendChild(categoryName);
    category.appendChild(categoryNotes);
  }
}

export function notes(ns: Note[], cols: number) {
  // const notes = document.createElement("table");
  // for (let n of ns) {
  //   const row = document.createElement("tr");
    
  //   const colId = document.createElement("td");
  //   colId.innerText = n.id.toString();
  //   row.appendChild(colId);

  //   for (let i = 1; i <= cols; i += 1) {
  //     const colData = document.createElement("td");
  //     const hc = new HttpClient();
  //     // hc.get(path,)
      

  //   }

  // }

}





