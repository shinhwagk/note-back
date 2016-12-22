import { httpGet } from "./http-client";
import { nav_ui, category_ui } from "./layout";
import { NoteBack } from "./noteback.obj";
import { Category } from "./category.obj";
import { Note } from "./note.obj";

declare var require: { <T>(path: string): T; };
require("../styles.css");

if (!location.hash) {
  location.href = "/#/index";
}

const path = location.hash.substring(2).replace("/-/", "/");

const body = document.getElementsByTagName("body")[0];

httpGet(`https://raw.githubusercontent.com/shinhwagk/note-back/data-note/${path}.json`)
  .then(nbString => {
    const noteback: NoteBack = JSON.parse(nbString);
    body.appendChild(nav_ui(noteback.labels));
    
    noteback.categorys.forEach((category: Category) => {
      const c_name: string = category.name;
      const col_num: number = category.cols;
      const c_ui = category_ui(category)
      body.appendChild(c_ui)
      // category.notes.map((note: Note) => {
      //   const id: number = note.id
      //   const doc: boolean = note.doc
      //   const file: boolean = note.file
      //   const datas = []
      //   for (let i = 1; i <= col_num; i += 1) {
      //     const prom = httpGet(`https://raw.githubusercontent.com/shinhwagk/note-back/data-note/${path}/${id}`)
      //     datas.push(prom)
      //   }
      //   return Promise.all(datas).then(datas => {
      //     return { id: id, data: datas }
      //   })
      // });
    });
  });

// httpClient.get("https://raw.githubusercontent.com/shinhwagk/note-back/data-note/index.json",
//   (noteback: NoteBack) => {
//     body.appendChild(nav(noteback.labels));
//     body.appendChild(categorys(noteback.categorys));
//   });
// httpClient.get("https://raw.githubusercontent.com/shinhwagk/note-back/data-note/index.json", (noteback) => { body.appendChild(nav(noteback.labels)) })

