import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { FloatOnScroll } from '../../directives/float-on-scroll';
import { Cv } from './cv';

describe('Cv', () => {
  let component: Cv;
  let fixture: ComponentFixture<Cv>;

  beforeEach(async () => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe = vi.fn();
        disconnect = vi.fn();
      },
    );

    await TestBed.configureTestingModule({
      imports: [Cv],
    }).compileComponents();

    fixture = TestBed.createComponent(Cv);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies the shared scroll animation to every section title and paragraph', () => {
    const host: HTMLElement = fixture.nativeElement;
    const animatedElements = fixture.debugElement
      .queryAll(By.directive(FloatOnScroll))
      .map((element) => element.nativeElement);

    expect(animatedElements).toEqual([
      ...host.querySelectorAll('section > .title-container, section > p'),
    ]);
    expect(animatedElements).toHaveLength(6);
  });
});
