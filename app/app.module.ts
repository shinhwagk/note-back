import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { NoteComponent } from './note.component'
import { AppRoutingModule } from './app-routing.module';
import "./rxjs-operators";

@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule],
  declarations: [AppComponent, NoteComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }