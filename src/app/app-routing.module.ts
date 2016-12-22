import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteBackComponent } from './noteback.component';

const routes: Routes = [
  { path: '', redirectTo: '/note/index', pathMatch: 'full' },
  { path: 'note/:path', component: NoteBackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
