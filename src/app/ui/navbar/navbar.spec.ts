import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { Calendar } from '../calendar/calendar';
import { Compass } from '../compass/compass';
import { User } from '../user/user';
import { Navbar } from './navbar';

@Component({ template: '' })
class RoutePage {}

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([
          { path: '', pathMatch: 'full', component: RoutePage },
          { path: 'cv', component: RoutePage },
          { path: 'booking', component: RoutePage },
          { path: 'therapy-process', component: RoutePage },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hides the mobile logo on any scroll and restores it at the top', async () => {
    const scrollY = Object.getOwnPropertyDescriptor(window, 'scrollY');
    const nav = fixture.nativeElement.querySelector('.nav') as HTMLElement;

    try {
      for (const [position, hidden] of [
        [0, false],
        [1, true],
        [300, true],
        [0, false],
        [-1, false],
      ] as const) {
        Object.defineProperty(window, 'scrollY', { configurable: true, value: position });
        window.dispatchEvent(new Event('scroll'));
        await fixture.whenStable();
        expect(nav.classList.contains('logo-hidden')).toBe(hidden);
      }

      Object.defineProperty(window, 'scrollY', { configurable: true, value: 1 });
      const restored = TestBed.createComponent(Navbar);
      await restored.whenStable();
      expect(restored.nativeElement.querySelector('.nav').classList.contains('logo-hidden')).toBe(
        true,
      );
      restored.destroy();
    } finally {
      if (scrollY) {
        Object.defineProperty(window, 'scrollY', scrollY);
      }
    }
  });

  it('should keep icon selection and chip highlighting in sync during navigation', async () => {
    const router = TestBed.inject(Router);
    const icons = [
      fixture.debugElement.query(By.directive(User)).injector.get(User),
      fixture.debugElement.query(By.directive(Calendar)).injector.get(Calendar),
      fixture.debugElement.query(By.directive(Compass)).injector.get(Compass),
    ];
    const chips = fixture.nativeElement.querySelectorAll('.chip') as NodeListOf<HTMLAnchorElement>;

    for (const [activeIndex, url] of ['/cv', '/booking', '/therapy-process', '/'].entries()) {
      await router.navigateByUrl(url);
      await fixture.whenStable();

      for (const [index, icon] of icons.entries()) {
        const selected = index === activeIndex;
        expect(icon.selected()).toBe(selected);
        expect(chips[index].classList.contains('highlighted')).toBe(selected);
        expect(icon.color()).toBe('currentColor');
        expect(chips[index].querySelector('svg')?.getAttribute('fill')).toBe('currentColor');
      }
    }
  });
});
