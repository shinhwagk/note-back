import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { UrlServices, Urls } from "./url.services";

@Injectable()
export class ApiServices {
  constructor(private _http: Http) { }

  _urlServices: Urls = UrlServices

  getLabel(l: string) {
    return this._http.get(this._urlServices.labelUrl(l)).map((res: Response) => res.json());
  }

  getNote(id: number) {
    return this._http.get(this._urlServices.noteUrl(id)).map((res: Response) => res.json());
  }

  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
}