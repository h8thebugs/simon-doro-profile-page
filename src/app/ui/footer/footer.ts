import { Component } from '@angular/core';
import { Envelope } from '../envelope/envelope';
import { MapPin } from '../map-pin/map-pin';
import { Phone } from '../phone/phone';

@Component({
  imports: [Envelope, MapPin, Phone],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {}
