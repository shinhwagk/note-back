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

  constructor(private _api: ApiService) {
  }

  ngOnInit() {
    const datas = []
    for (let i = 1; i <= this.cols; i += 1) {
      const pdata = this._api.getNoteBackData(this.path, this.note.id, i).toPromise()
      datas.push(pdata)
    }
    Promise.all(datas).then(datas => this._datas = datas)
  }

  @Input() note: Note;
  @Input() path: string;
  @Input() cols: number;
  _datas = []
}
