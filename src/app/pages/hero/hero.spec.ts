import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
