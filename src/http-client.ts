import { NoteBack } from './noteback.obj';
export class HttpClient {
  xmlhttp = new XMLHttpRequest()

  get(url, layout) {
    this.xmlhttp.onreadystatechange = () => this.state_Change(layout)
    this.xmlhttp.open("GET", url, true);
    this.xmlhttp.send(null);
  }

  state_Change(layout) {
    if (this.xmlhttp.readyState == 4) {
      if (this.xmlhttp.status == 200) {
        const noteback: NoteBack = JSON.parse(this.xmlhttp.responseText)
        layout(noteback)
      } else {
        document.write("ii")
      }
    }
  }
}