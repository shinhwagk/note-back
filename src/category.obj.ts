import { Note } from './note.obj'

export interface Category {
  name: string;
  cols: number;
  notes: Note[]
}