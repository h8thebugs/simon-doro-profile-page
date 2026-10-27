import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Envelope } from './envelope';

describe('Envelope', () => {
  let component: Envelope;
  let fixture: ComponentFixture<Envelope>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Envelope],
    }).compileComponents();

    fixture = TestBed.createComponent(Envelope);
    fixture.componentRef.setInput('color', '#123456');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render and update the SVG fill from the color input', async () => {
    const svg = (fixture.nativeElement as HTMLElement).querySelector('svg');
    expect(svg?.getAttribute('fill')).toBe('#123456');

    fixture.componentRef.setInput('color', '#abcdef');
    await fixture.whenStable();

    expect(svg?.getAttribute('fill')).toBe('#abcdef');
  });
});
