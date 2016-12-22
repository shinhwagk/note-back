/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotebackComponent } from './noteback.component';

describe('NotebackComponent', () => {
  let component: NotebackComponent;
  let fixture: ComponentFixture<NotebackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotebackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
