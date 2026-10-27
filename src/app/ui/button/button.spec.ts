import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    fixture.componentRef.setInput('label', 'Continue');
    fixture.componentRef.setInput('theme', 'primary');
    await fixture.whenStable();
  });

  it('renders its label in a focusable native button', () => {
    const host = fixture.nativeElement as HTMLElement;
    const button = host.querySelector('button');

    expect(button?.textContent?.trim()).toBe('Continue');
    button?.focus();
    expect(document.activeElement).toBe(button);
  });

  it('bubbles activation without submitting a containing form', () => {
    const host = fixture.nativeElement as HTMLElement;
    const form = document.createElement('form');
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    const onClick = vi.fn();
    form.addEventListener('submit', onSubmit);
    host.addEventListener('click', onClick);
    form.append(host);
    document.body.append(form);

    try {
      host.querySelector('button')?.click();

      expect(onClick).toHaveBeenCalledOnce();
      expect(onSubmit).not.toHaveBeenCalled();
    } finally {
      form.remove();
    }
  });
});
