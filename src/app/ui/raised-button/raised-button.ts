import { Component, computed, inject, input } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ThemeType } from '../../models/theme.type';

@Component({
  imports: [],
  selector: 'app-raised-button',
  styleUrl: './raised-button.css',
  templateUrl: './raised-button.html',
})
export class RaisedButton {
  label = input.required<string>();
  theme = input.required<ThemeType>();
  themeService = inject(ThemeService);
  colors = computed(() => this.themeService.toColor(this.theme(), true));
}
