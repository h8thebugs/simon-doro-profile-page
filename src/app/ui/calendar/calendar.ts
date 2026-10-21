import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-calendar',
  styleUrl: './calendar.css',
  templateUrl: './calendar.html',
})
export class Calendar {
  selected = input<boolean>(false);
  color = input<string>('currentColor');
}
