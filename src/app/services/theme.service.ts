import { Service } from '@angular/core';
import { Color, ThemeType } from '../models/theme.type';

@Service()
export class ThemeService {
  toColor(theme: ThemeType, invert: boolean = false): Color {
    return invert
      ? { foreground: `var(--${theme})`, background: `var(--on-${theme})` }
      : { foreground: `var(--on-${theme})`, background: `var(--${theme})` };
  }
}
