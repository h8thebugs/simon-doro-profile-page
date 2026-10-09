import { Component, input } from '@angular/core';

@Component({
  selector: 'app-monstera',
  templateUrl: './monstera.html',
  styleUrl: './monstera.css',
  host: {
    'aria-hidden': 'true',
  },
})
export class Monstera {
  color = input.required<string>();
}
