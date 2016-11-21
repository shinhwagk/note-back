import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  constructor(private _http: Http) {
    this._http.get("https://raw.githubusercontent.com/shinhwagk/note-back-pages/data/index.json")
      .map((res: Response) => res.json())
      .toPromise().then(p => this._labels = p.labels)
  }

  _labels: string[] = []
}