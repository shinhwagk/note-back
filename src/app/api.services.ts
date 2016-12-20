import { Injectable } from '@angular/core'
import { Headers, RequestOptions, Http, Response } from '@angular/http'
import { Observable } from "rxjs/Observable";

@Injectable()
export class ApiServices {

  constructor(private _http: Http) { }

  private url: string = "https://raw.githubusercontent.com/shinhwagk/note-back/data-note"

  private genUrl(path: string) {
    return this.url + '/' + path.replace('-', '/')
  }

  getNoteBack(path: string) {
    const url = this.genUrl(path)
    return this._http.get(url).map((res: Response) => res.json())
  }

  private headers = new Headers({ 'Content-Type': 'application/json' })
  private option = new RequestOptions({ headers: this.headers })
}