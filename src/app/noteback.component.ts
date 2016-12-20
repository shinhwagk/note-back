import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from '@angular/common'

import { ApiServices } from "./api.services";
import { NoteBack, Category, Note } from './noteback-objects'

@Component({
  selector: 'note-back',
  templateUrl: './noteback.component.html',
  styleUrls: ['./noteback.component.css'],
  providers: [ApiServices]
})
export class NoteBackComponent implements OnInit {

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this._path = params['path'];
      alert(JSON.stringify(this._http))
      this._api.getNoteBack(this._path).toPromise().then(this.parserNoteBack)
    })
  }

  constructor(
    private _http: Http,
    private _api: ApiServices,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
  }

  parserNoteBack(nb: NoteBack) {
    const noteback: NoteBack = nb
    this._labels = noteback.labels
    this._categorys = noteback.categorys
  }
  // getNoteBack(path: string) {
  //   this._api.getNoteBack(path).toPromise().then((l: NoteBack) => this._noteback = l)
  // }

  goLabel(label: string): void {
    this.router.navigate(['/note', this._path + '/' + label]);
  }

  goBack() {
    this.location.back();
  }

  _noteback: NoteBack
  _path: string
  _labels: string[] = [];
  _categorys: Category[] = []
}