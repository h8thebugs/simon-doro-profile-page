import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-envelope',
  styleUrl: './envelope.css',
  templateUrl: './envelope.html',
})
export class Envelope {
  color = input.required<string>();
}
