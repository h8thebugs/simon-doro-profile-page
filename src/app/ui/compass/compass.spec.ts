import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Compass } from './compass';

describe('Compass', () => {
  let component: Compass;
  let fixture: ComponentFixture<Compass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compass],
    }).compileComponents();

    fixture = TestBed.createComponent(Compass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an outline icon using the text color by default', () => {
    const svg = fixture.nativeElement.querySelector('svg') as SVGSVGElement;

    expect(component.selected()).toBe(false);
    expect(component.color()).toBe('currentColor');
    expect(svg.getAttribute('fill')).toBe('currentColor');
    expect(svg.getAttribute('width')).toBe('28');
    expect(svg.getAttribute('height')).toBe('28');
  });

  it('should apply the color input to both outline and filled icons', async () => {
    const outlinePath = fixture.nativeElement.querySelector('path').getAttribute('d');
    fixture.componentRef.setInput('color', '#ff0000');
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('svg').getAttribute('fill')).toBe('#ff0000');

    fixture.componentRef.setInput('selected', true);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('svg').getAttribute('fill')).toBe('#ff0000');
    expect(fixture.nativeElement.querySelector('path').getAttribute('d')).not.toBe(outlinePath);

    fixture.componentRef.setInput('selected', false);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('svg').getAttribute('fill')).toBe('#ff0000');
    expect(fixture.nativeElement.querySelector('path').getAttribute('d')).toBe(outlinePath);
  });
});
