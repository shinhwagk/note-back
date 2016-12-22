import { Injectable } from '@angular/core'
import { Headers, RequestOptions, Http, Response } from '@angular/http'

@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  private url: string = 'https://raw.githubusercontent.com/shinhwagk/note-back/data-note'

  getNoteBack(path: string) {
    const url = this.url + '/' + path.replace('-', '/') + '.json';
    return this._http.get(url).map((res: Response) => res.json());
  }

  getNoteBackData(path: string, id: number, col: number) {
    const url = this.url + '/' + path.replace('-', '/') + '/' + id + '/' + col;
    return this._http.get(url).map((res: Response) => res.text());
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private option = new RequestOptions({ headers: this.headers });
}
