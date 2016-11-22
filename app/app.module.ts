import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import "./rxjs-operators";

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component'
import { AppRoutingModule } from './app-routing.module';
import { OrclTabRelComponent } from './oracle-table-relation/otr.component';
import { OrclTabRelAllComponent } from './oracle-table-relation/otr-all-component';

@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule],
  declarations: [AppComponent, NoteComponent, OrclTabRelComponent, OrclTabRelAllComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }