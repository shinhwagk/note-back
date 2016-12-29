import { Component, Input } from '@angular/core';
import { Category, Note } from '../noteback-objects';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() categorys: Category[];
  @Input() path: string[];
}
