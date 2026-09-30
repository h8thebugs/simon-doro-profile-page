import { Component, computed, inject, input } from '@angular/core';
import { ThemeType } from '../../models/theme.type';
import { ThemeService } from '../../services/theme.service';

@Component({
  imports: [],
  selector: 'app-card',
  styleUrl: './card.css',
  templateUrl: './card.html',
})
export class Card {
  theme = input.required<ThemeType>();
  inverted = input<boolean>(false);
  themeService = inject(ThemeService);
  colors = computed(() => this.themeService.toColor(this.theme(), true));
}
