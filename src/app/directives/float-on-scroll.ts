import { afterNextRender, DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';

@Directive({
  selector: '[appFloatOnScroll]',
  host: {
    '[class.float-in]': 'visible()',
  },
})
export class FloatOnScroll {
  protected readonly visible = signal(false);

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver((entries) => {
        if (this.visible() || !entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        this.visible.set(true);
        observer.disconnect();
      });

      observer.observe(this.element.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
