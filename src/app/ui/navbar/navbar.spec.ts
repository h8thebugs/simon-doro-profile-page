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
