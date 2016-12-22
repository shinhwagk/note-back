export interface NoteBack {
  labels: string[];
  categorys: Category[];
}

export interface Category {
  name: string;
  cols: number;
  notes: Note[]
}

export interface Note {
  id: number;
  doc: boolean;
  file: boolean;
}