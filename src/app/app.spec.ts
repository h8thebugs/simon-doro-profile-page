import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it.each([
    ['/', 'app-hero'],
    ['/cv', 'app-cv'],
    ['/therapy-process', 'app-therapy-process'],
    ['/booking', 'app-booking'],
  ])('should render %s in the router outlet', async (url, selector) => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(selector)).not.toBeNull();
    expect(compiled.querySelector('app-navbar')).not.toBeNull();
    expect(compiled.querySelectorAll('app-card')).toHaveLength(url === '/' ? 6 : 0);
  });

  it('should switch pages using the navbar', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    for (const [url, selector] of [
      ['/cv', 'app-cv'],
      ['/therapy-process', 'app-therapy-process'],
      ['/booking', 'app-booking'],
      ['/', 'app-hero'],
    ]) {
      const link = compiled.querySelector<HTMLAnchorElement>(`.chip[href="${url}"]`);
      if (!link) {
        throw new Error(`Missing navbar link for ${url}`);
      }
      link.click();
      await fixture.whenStable();
      expect(router.url).toBe(url);
      expect(compiled.querySelector(selector)).not.toBeNull();
    }
  });
});
