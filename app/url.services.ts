export interface Urls {
  labelUrl(label: string): string;
  tableUrl?(name: string): string;

  OTRddvUrl?(): string;
  OTRdpvUrl?(): string;
}

export class RestUrls implements Urls {
  labelUrl(label: string): string { return `/api/note/${label}`; }

  labelsUrl: string = "/api/labels"
}

export class GithubUrls implements Urls {
  labelUrl(label: string): string { return `https://raw.githubusercontent.com/shinhwagk/note-back/data/note/${label}.json`; }
  labelsUrl: string = "data/labels.json"

  // oracle table relation
  tableUrl(name: string): string { return `https://raw.githubusercontent.com/shinhwagk/note-back/data/oracle-table-relation/ddv/${name}.json`; }
  OTRddvUrl(): string { return `https://raw.githubusercontent.com/shinhwagk/note-back/data/oracle-table-relation/ddv/index.json`; }
  OTRdpvUrl(): string { return `https://raw.githubusercontent.com/shinhwagk/note-back/data/oracle-table-relation/dpv/index.json`; }
}

// export const UrlServices: Urls = new GithubUrls();
export const UrlServices: Urls = new RestUrls();
