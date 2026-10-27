import { DOCUMENT } from '@angular/common';
import { Component, HostListener, inject, signal, OnInit } from '@angular/core';
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
export class Navbar implements OnInit {
  private readonly document = inject(DOCUMENT);
  protected readonly isScrolled = signal(false);

  ngOnInit() {
    this.updateScrollState();
  }

  @HostListener('window:scroll')
  protected updateScrollState() {
    const scrollY = this.document.defaultView?.scrollY ?? 0;
    this.isScrolled.set(scrollY > 0);
  }
}
