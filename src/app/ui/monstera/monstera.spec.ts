import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Monstera } from './monstera';

describe('Monstera', () => {
  let fixture: ComponentFixture<Monstera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Monstera] }).compileComponents();
    fixture = TestBed.createComponent(Monstera);
    fixture.componentRef.setInput('color', '#D9E8E8');
    await fixture.whenStable();
  });

  it('renders the original SVG inline with normalized paths', () => {
    const host: HTMLElement = fixture.nativeElement;
    const paths = host.querySelectorAll('svg path');

    expect(paths).toHaveLength(5);
    expect([...paths].every((path) => path.getAttribute('pathLength') === '1')).toBe(true);
  });

  it('hides the decorative leaf from assistive technology', () => {
    const host: HTMLElement = fixture.nativeElement;

    expect(host.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies the required color to all strokes without path overrides', () => {
    const host: HTMLElement = fixture.nativeElement;
    const svg = host.querySelector('svg');

    expect(svg?.getAttribute('stroke')).toBe('#D9E8E8');
    expect(host.querySelectorAll('path[stroke]')).toHaveLength(0);
  });

  it('updates the stroke when the color input changes', async () => {
    fixture.componentRef.setInput('color', 'var(--on-secondary)');
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelector('svg')?.getAttribute('stroke')).toBe('var(--on-secondary)');
  });
});
