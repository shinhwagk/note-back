import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoteComponent } from './note/note.component'
import { OrclTabRelComponent } from './oracle-table-relation/otr.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: AppComponent },

  //note
  { path: 'note/:path', component: NoteComponent },

  //oracle table relation
  { path: 'orcltabrel/:name', component: OrclTabRelComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }