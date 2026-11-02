import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tree } from './tree';

describe('Tree', () => {
  let fixture: ComponentFixture<Tree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Tree] }).compileComponents();
    fixture = TestBed.createComponent(Tree);
    fixture.componentRef.setInput('color', '#D9E8E8');
    await fixture.whenStable();
  });

  it('renders separate normalized strokes as a decorative SVG', () => {
    const host: HTMLElement = fixture.nativeElement;
    const paths = host.querySelectorAll('svg path');

    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(host.querySelector('svg')?.getAttribute('fill')).toBe('none');
    expect(paths).toHaveLength(4);
    for (const path of paths) {
      expect(path.getAttribute('pathLength')).toBe('1');
      expect(path.getAttribute('d')?.match(/m/gi)).toHaveLength(1);
    }
  });

  it('applies and updates the input color to all strokes', async () => {
    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelector('svg')?.getAttribute('stroke')).toBe('#D9E8E8');
    expect(host.querySelectorAll('path[stroke]')).toHaveLength(0);

    fixture.componentRef.setInput('color', 'var(--primary)');
    await fixture.whenStable();

    expect(host.querySelector('svg')?.getAttribute('stroke')).toBe('var(--primary)');
  });
});
