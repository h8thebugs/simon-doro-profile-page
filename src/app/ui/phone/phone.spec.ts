import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Phone } from './phone';

describe('Phone', () => {
  let component: Phone;
  let fixture: ComponentFixture<Phone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Phone],
    }).compileComponents();

    fixture = TestBed.createComponent(Phone);
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
