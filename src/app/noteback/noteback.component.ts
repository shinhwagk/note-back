import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../api.service';
import { NoteBack, Category, Note } from '../noteback-objects';

@Component({
  selector: 'app-noteback',
  templateUrl: './noteback.component.html',
  styleUrls: ['./noteback.component.css'],
  providers: [ApiService]
})
export class NotebackComponent implements OnInit {
  _path: string[] = [];
  _labels: string[] = [];
  _categorys: Category[] = [];
  _f_labels: string[] = [];

  constructor(
    private _api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this._path = params['path'].split(',');
      this._api.getNoteBack(this._path.join('/')).toPromise().then(nb => this.parseNoteBack(nb));
      this.genFLabel(this._path.slice());
    });
  }

  parseNoteBack(nb: NoteBack) {
    this._labels = nb.labels;
    this._categorys = nb.categorys;
  }

  gotoLabel(label: string) {
    this._f_labels.push(label);
    this._path.push(label);
    this.router.navigate(['/note', { path: this._path }]);
  }

  backLabel(label: string, idx: number) {
    this._f_labels.slice(0, idx)
    this._f_labels.splice(0, 0, 'index')
    this.router.navigate(['/note', { path: this._f_labels }]);
  }

  genFLabel(paths: string[]) {
    paths.pop();
    paths.shift();
    this._f_labels = paths;
  }

  goback() {
    this.location.back();
  }
}
