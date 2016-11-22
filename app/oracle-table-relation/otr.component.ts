
import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from '@angular/common'

import { ApiServices } from "../api.services";

@Component({
  selector: 'my-app-otr',
  templateUrl: 'app/oracle-table-relation/otr.component.html',
  styleUrls: ['app/oracle-table-relation/otr.component.css']
})
export class OrclTabRelComponent implements OnInit {
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this._path = params['name'];
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

  _path
  _labels: string[] = [];
  _notes;
  _note_type: string[] = [];

  gotoLabel(label: string):void {
    this.router.navigate(['/note', this._path + '/' + label]);
  }

  goBack(): void {
    this.location.back();
  }
}