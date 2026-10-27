import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-map-pin',
  styleUrl: './map-pin.css',
  templateUrl: './map-pin.html',
})
export class MapPin {
  color = input.required<string>();
}
