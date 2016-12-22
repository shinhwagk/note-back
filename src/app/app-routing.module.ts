import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotebackComponent } from './noteback/noteback.component';

const routes: Routes = [
  { path: '', redirectTo: '/note/index', pathMatch: 'full' },
  { path: 'note/:path', component: NotebackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
