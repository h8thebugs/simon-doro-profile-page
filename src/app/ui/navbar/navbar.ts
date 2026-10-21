import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../user/user';
import { Calendar } from '../calendar/calendar';
import { Compass } from '../compass/compass';

@Component({
  imports: [RouterLink, RouterLinkActive, User, Calendar, Compass],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {}
