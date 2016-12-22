import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../noteback-objects';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() category: Category;
  @Input() path: string;
}
