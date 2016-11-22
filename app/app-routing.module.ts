import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoteComponent } from './note/note.component'
import { OrclTabRelComponent } from './oracle-table-relation/otr.component';

const routes_Note: Routes = [
  { path: '', redirectTo: '/note/index', pathMatch: 'full' },
  { path: 'note/:path', component: NoteComponent }
];

const routes_OrclTabRel: Routes = [
  { path: 'orcltabrel/:name', component: OrclTabRelComponent }
];

const routes = routes_note.concat(routes_orcl_tab_rel)

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }