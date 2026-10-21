import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from './user';

describe('User', () => {
  let component: User;
  let fixture: ComponentFixture<User>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [User],
    }).compileComponents();

    fixture = TestBed.createComponent(User);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the text color for both icon variants by default', async () => {
    expect(component.color()).toBe('currentColor');
    expect(fixture.nativeElement.querySelector('svg').getAttribute('fill')).toBe('currentColor');

    fixture.componentRef.setInput('selected', true);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('svg').getAttribute('fill')).toBe('currentColor');
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
