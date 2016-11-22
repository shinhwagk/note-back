import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoteComponent } from './note-back/note.component'

const routes: Routes = [
  { path: '', redirectTo: '/note-back/index', pathMatch: 'full' },
  { path: '/note-back/:path', component: NoteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }