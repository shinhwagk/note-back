
import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from '@angular/common'

import { ApiServices } from "../api.services";

@Component({
  selector: 'my-app-note',
  templateUrl: 'app/note/note.component.html',
  styleUrls: ['app/note/note.component.css'],
  providers: [ApiServices]
})
export class NoteComponent implements OnInit {
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this._path = params['path'];
      this._api.getLabel(this._path).toPromise().then(p => {
        this._labels = p.labels
        this._notes = p.notes
        this._note_type = Object.keys(this._notes)
      });
    })
  }

  constructor(
    private _http: Http,
    private _api: ApiServices,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
  }

  _path: any
  _labels: string[] = [];
  _notes: any;
  _note_type: string[] = [];

  gotoLabel(label: string): void {
    this.router.navigate(['/note', this._path + '/' + label]);
  }

  goBack(): void {
    this.location.back();
  }
}