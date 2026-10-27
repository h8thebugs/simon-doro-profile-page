import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { App } from '../../app';
import { routes } from '../../app.routes';

describe('Shared footer', () => {
  beforeEach(async () => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe = vi.fn();
        disconnect = vi.fn();
      },
    );

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('keeps a single contact footer after the page content across navigation', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const host = fixture.nativeElement as HTMLElement;

    for (const url of ['/', '/cv', '/therapy-process', '/booking', '/']) {
      await router.navigateByUrl(url);
      await fixture.whenStable();

      expect(host.querySelectorAll('footer')).toHaveLength(1);
      expect(host.querySelector('main + app-footer footer')).not.toBeNull();
      expect(host.querySelector('main .dynamic-grid')).toBeNull();

      const footer = host.querySelector('footer');
      expect(footer?.querySelectorAll('a')).toHaveLength(3);
      expect(footer?.querySelector('a[href="https://goo.gl/maps/xyz"]')?.textContent).toContain(
        '1234 Budapest, Fő utca 1.',
      );
      expect(footer?.querySelector('a[href="mailto:info@drdoro.hu"]')?.textContent).toContain(
        'info@drdoro.hu',
      );
      expect(footer?.querySelector('a[href="tel:+36301234567"]')?.textContent).toContain(
        '+36 30 123 4567',
      );
      expect(footer?.querySelectorAll('svg[fill="var(--tertiary)"]')).toHaveLength(3);
    }
  });
});
