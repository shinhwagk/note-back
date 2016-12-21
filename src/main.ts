import { HttpClient } from "./http-client";
import { nav } from "./layout";

declare var require: { <T>(path: string): T; };
require("../styles.css");

if (!location.hash) {
  location.href = "/#/index";
}

export const path = location.hash;

const body = document.getElementsByTagName("body")[0];

const httpClient = new HttpClient();

httpClient.get("https://raw.githubusercontent.com/shinhwagk/note-back/data-note/index.json", (noteback) => { body.appendChild(nav(noteback.labels)) });
// httpClient.get("https://raw.githubusercontent.com/shinhwagk/note-back/data-note/index.json", (noteback) => { body.appendChild(nav(noteback.labels)) })

