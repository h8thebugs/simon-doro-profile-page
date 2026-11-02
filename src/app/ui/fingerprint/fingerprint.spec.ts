import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fingerprint } from './fingerprint';

describe('Fingerprint', () => {
  let fixture: ComponentFixture<Fingerprint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Fingerprint] }).compileComponents();
    fixture = TestBed.createComponent(Fingerprint);
    fixture.componentRef.setInput('color', '#D9E8E8');
    await fixture.whenStable();
  });

  it('draws each ridge as a separate normalized open stroke', () => {
    const host: HTMLElement = fixture.nativeElement;
    const paths = host.querySelectorAll('svg path');

    expect(paths).toHaveLength(7);
    for (const path of paths) {
      expect(path.getAttribute('pathLength')).toBe('1');
      const commands = path.getAttribute('d') ?? '';
      expect(commands.match(/m/gi)).toHaveLength(1);
      expect(commands).not.toMatch(/z/i);
    }
  });

  it('hides the decorative fingerprint from assistive technology', () => {
    const host: HTMLElement = fixture.nativeElement;

    expect(host.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies the required color to the SVG stroke', () => {
    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelector('svg')?.getAttribute('stroke')).toBe('#D9E8E8');
  });

  it('updates the stroke when the color input changes', async () => {
    fixture.componentRef.setInput('color', 'var(--on-secondary)');
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelector('svg')?.getAttribute('stroke')).toBe('var(--on-secondary)');
  });
});
