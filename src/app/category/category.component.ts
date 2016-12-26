import { Component, Input } from '@angular/core';
import { Category, Note } from '../noteback-objects';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  @Input() category: Category;
  @Input() path: string;

  gotoDoc(note: Note) {
      const path = this.path.replace(/-/,"/")
      window.open("https://github.com/shinhwagk/note-back/blob/data-note/" + path + "/" + note.id + "/doc/README.md")
  }
}
