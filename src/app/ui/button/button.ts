import { Component, computed, inject, input } from '@angular/core';
import { ThemeType } from '../../models/theme.type';
import { ThemeService } from '../../services/theme.service';

@Component({
  imports: [],
  selector: 'app-button',
  styleUrl: './button.css',
  templateUrl: './button.html',
})
export class Button {
  label = input.required<string>();
  theme = input.required<ThemeType>();
  themeService = inject(ThemeService);
  colors = computed(() => this.themeService.toColor(this.theme()));
}
