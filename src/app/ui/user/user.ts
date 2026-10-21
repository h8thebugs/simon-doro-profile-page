import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-user',
  styleUrl: './user.css',
  templateUrl: './user.html',
})
export class User {
  selected = input<boolean>(false);
  color = input<string>('currentColor');
}
