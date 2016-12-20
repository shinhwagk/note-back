import './rxjs-operators'
import { Observable } from "rxjs/Observable";

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NoteBackComponent } from './noteback.component';
import { ApiServices } from './api.services'

@NgModule({
  declarations: [
    AppComponent,
    NoteBackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ApiServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
