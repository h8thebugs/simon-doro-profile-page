import { Component, input } from '@angular/core';

@Component({
  selector: 'app-graduation-cap',
  templateUrl: './graduation-cap.html',
  styleUrl: './graduation-cap.css',
  host: {
    'aria-hidden': 'true',
  },
})
export class GraduationCap {
  color = input.required<string>();
}
