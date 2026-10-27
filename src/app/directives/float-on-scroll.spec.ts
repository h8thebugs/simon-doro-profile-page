import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { FloatOnScroll } from './float-on-scroll';

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root = null;
  readonly rootMargin = '0px';
  readonly scrollMargin = '0px';
  readonly thresholds = [0];
  readonly observe = vi.fn<(target: Element) => void>();
  readonly unobserve = vi.fn<(target: Element) => void>();
  readonly disconnect = vi.fn<() => void>();
  readonly takeRecords = vi.fn<() => IntersectionObserverEntry[]>(() => []);

  constructor(private readonly callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }

  emit(target: Element, isIntersecting: boolean): void {
    const rect = target.getBoundingClientRect();

    this.callback(
      [
        {
          target,
          isIntersecting,
          intersectionRatio: isIntersecting ? 1 : 0,
          boundingClientRect: rect,
          intersectionRect: rect,
          rootBounds: null,
          time: 0,
        },
      ],
      this,
    );
  }
}

@Component({
  imports: [FloatOnScroll],
  template: `
    <div appFloatOnScroll></div>
    <div appFloatOnScroll></div>
  `,
})
class TestHost {}

describe('FloatOnScroll', () => {
  let fixture: ComponentFixture<TestHost>;
  let elements: NodeListOf<HTMLDivElement>;
  let observers: MockIntersectionObserver[];

  beforeEach(async () => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;
    elements = host.querySelectorAll('div');
    observers = MockIntersectionObserver.instances;
  });

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
  });

  it('waits for viewport entry before adding an animation class', () => {
    expect(observers).toHaveLength(2);
    expect(observers[0].observe).toHaveBeenCalledWith(elements[0]);
    expect(observers[1].observe).toHaveBeenCalledWith(elements[1]);

    observers[0].emit(elements[0], false);
    fixture.detectChanges();

    expect(elements[0].classList.contains('float-in')).toBe(false);
    expect(elements[1].classList.contains('float-in')).toBe(false);
    expect(observers[0].disconnect).not.toHaveBeenCalled();
  });

  it('reveals each element independently with the shared upward animation', () => {
    observers[0].emit(elements[0], true);
    fixture.detectChanges();

    expect(elements[0].classList.contains('float-in')).toBe(true);
    expect(elements[1].classList.contains('float-in')).toBe(false);
    expect(observers[0].disconnect).toHaveBeenCalledOnce();

    observers[1].emit(elements[1], true);
    fixture.detectChanges();

    expect(elements[1].classList.contains('float-in')).toBe(true);
    expect(observers[1].disconnect).toHaveBeenCalledOnce();
  });

  it('does not restart the animation after the first viewport entry', () => {
    observers[0].emit(elements[0], true);
    fixture.detectChanges();

    observers[0].emit(elements[0], false);
    observers[0].emit(elements[0], true);
    fixture.detectChanges();

    expect(elements[0].classList.contains('float-in')).toBe(true);
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
  });

  it('disconnects observers when their elements are destroyed before entering the viewport', () => {
    fixture.destroy();

    for (const observer of observers) {
      expect(observer.disconnect).toHaveBeenCalledOnce();
    }
  });
});
