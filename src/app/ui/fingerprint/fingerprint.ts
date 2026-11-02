import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.html',
  styleUrl: './fingerprint.css',
  host: {
    'aria-hidden': 'true',
  },
})
export class Fingerprint {
  color = input.required<string>();
}
