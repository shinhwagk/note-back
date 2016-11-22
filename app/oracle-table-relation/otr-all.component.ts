import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from '@angular/common'

import { ApiServices } from "../api.services";

@Component({
  selector: 'my-app-otr-all',
  templateUrl: 'app/oracle-table-relation/otr-all.component.html',
  styleUrls: ['app/oracle-table-relation/otr-all.component.css'],
  providers: [ApiServices]
})
export class OrclTabRelAllComponent implements OnInit {
  ngOnInit(): void {
    this._api.getTableAll().toPromise().then(names => this._names = names);
  }

  constructor(
    private _http: Http,
    private _api: ApiServices,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
  }

  goBack(): void {
    this.location.back();
  }
  
  _names: string[] = []
}