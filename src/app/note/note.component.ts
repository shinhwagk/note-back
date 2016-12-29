import { Component, OnInit, Input } from '@angular/core';

import { Note } from '../noteback-objects';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  providers: [ApiService]
})
export class NoteComponent implements OnInit {
  @Input() notes: Note[];
  @Input() path: string[];
  @Input() cols: number;
  _note_data = new Map<number, string[]>();

  constructor(private _api: ApiService) { }

  ngOnInit() {
    this.notes.forEach((note: Note) =>
      this.getNoteData(note.id).then(datas => this._note_data.set(note.id, datas))
    );
  }

  getNoteData(id: number) {
    return Promise.all(Array.from(Array(this.cols + 1).keys()).filter(i => i !== 0).map(i => this._api.getNoteBackData(this.path.join('/'), id, i).toPromise()));
  }

  gotoDoc(note: Note) {
    const path = this.path.join('/');
    window.open('https://github.com/shinhwagk/note-back/blob/data-note/' + path + '/' + note.id + '/doc/README.md');
  }
}
