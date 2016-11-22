
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
    // this.route.params.forEach((params: Params) => {
    //   this._name = params['name'];
    //   this._api.getTable(this._name).toPromise().then(tab => this._table = tab);
    // })
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
  
  _name: string
  _table:string[][] = []
}