export interface Urls {
  labelsUrl: string;
  labelUrl(label: string): string;
  noteUrl(id: number): string;

}

export class LocalUrls implements Urls {
  noteUrl(id: number): string { return `/api/note/${id}`; }
  labelUrl(label: string): string { return `data/${label}.json`; }
  labelsUrl: string = "/api/labels"
}

export class GithubUrls implements Urls {
  noteUrl(id: number): string { return `data/notes/${id}/data.json`; }
  labelUrl(label: string): string { return `https://raw.githubusercontent.com/shinhwagk/note-back/data/note/${label}.json`; }
  labelsUrl: string = "data/labels.json"

  // oracle table relation

  tableUrl(name: string): string { return `https://raw.githubusercontent.com/shinhwagk/note-back/data/oracle-table-relation/${name}.json`; }
}

export const UrlServices: Urls = new GithubUrls();
// export const UrlServices: Urls = new LocalUrls();
