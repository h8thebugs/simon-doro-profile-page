import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { Booking } from '../booking/booking';
import { Hero } from './hero';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe = vi.fn();
        disconnect = vi.fn();
      },
    );

    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [provideRouter([{ path: 'booking', component: Booking }])],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds the booking call to action to the first card while preserving its quote', () => {
    const host: HTMLElement = fixture.nativeElement;
    const firstCard = host.querySelector('app-card');
    const link = firstCard?.querySelector<HTMLAnchorElement>('.booking-link');

    expect(firstCard?.querySelector('h1')?.textContent).toContain('A változás ott kezdődik');
    expect(link?.textContent?.trim()).toBe('Foglalj egy időpontot');
    expect(link?.getAttribute('href')).toBe('/booking');
    expect(host.querySelectorAll('.booking-link')).toHaveLength(1);
  });

  it('navigates to the booking page when the first card link is clicked', async () => {
    const host: HTMLElement = fixture.nativeElement;
    const link = host.querySelector<HTMLAnchorElement>('.booking-link');

    if (!link) {
      throw new Error('Missing booking link in the first card');
    }

    link.click();
    await fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe('/booking');
  });

  it('displays the animated monstera only in the first primary card', () => {
    const host: HTMLElement = fixture.nativeElement;
    const cards = host.querySelectorAll('app-card');

    expect(host.querySelectorAll('app-monstera')).toHaveLength(1);
    expect(cards[0].querySelector('app-monstera svg')).not.toBeNull();
    expect(cards[0].querySelector('app-monstera svg')?.getAttribute('stroke')).toBe(
      'var(--on-primary)',
    );
  });
});
