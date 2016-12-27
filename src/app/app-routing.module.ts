import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotebackComponent } from './noteback/noteback.component';

const routes: Routes = [
  { path: '', redirectTo: '/note;path=index',pathMatch: 'full' },
  { path: 'note', component: NotebackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
