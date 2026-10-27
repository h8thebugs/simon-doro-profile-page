import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-phone',
  styleUrl: './phone.css',
  templateUrl: './phone.html',
})
export class Phone {
  color = input.required<string>();
}
