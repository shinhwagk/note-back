import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotebackComponent } from './noteback/noteback.component';
import { CategoryComponent } from './category/category.component';
import { NoteComponent } from './note/note.component';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    NotebackComponent,
    CategoryComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
