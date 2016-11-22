import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { UrlServices, Urls } from "./url.services";

@Injectable()
export class ApiServices {
  constructor(private _http: Http) { }

  _urlServices: Urls = UrlServices

  // note
  getLabel(l: string) { return this._http.get(this._urlServices.labelUrl(l)).map((res: Response) => res.json()); }
  getNote(id: number) { return this._http.get(this._urlServices.noteUrl(id)).map((res: Response) => res.json()); }

  // oracle table relation
  getTableByName(name: string) { return this._http.get(this._urlServices.tableUrl(name)).map((res: Response) => res.json()); }
  getDDVAll() { return this._http.get(this._urlServices.OTRddvUrl()).map((res: Response) => res.json()); }
  getDPVAll() { return this._http.get(this._urlServices.OTRdpvUrl()).map((res: Response) => res.json()); }

  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
}