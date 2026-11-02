import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.html',
  styleUrl: './tree.css',
  host: {
    'aria-hidden': 'true',
  },
})
export class Tree {
  color = input.required<string>();
}
