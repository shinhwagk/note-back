import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common'

import { ApiService } from '../api.service';
import { NoteBack, Category, Note } from '../noteback-objects';

@Component({
  selector: 'app-noteback',
  templateUrl: './noteback.component.html',
  styleUrls: ['./noteback.component.css'],
  providers: [ApiService]
})
export class NotebackComponent implements OnInit {

  constructor(
    private _api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this._path = params['path'];
      this._api.getNoteBack(this._path).toPromise().then(nb => this.parseNoteBack(nb));
    });
  }

  parseNoteBack(nb: NoteBack) {
    this._labels = nb.labels;
    this._categorys = nb.categorys;
  }

  gotoLabel(label: string) {
    this.router.navigate(['/note', this._path + '-' + label]);
  }

  goback() {
    this.location.back();
  }

  _path: string;
  _labels: string[] = [];
  _categorys: Category[] = [];
}
