import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeStore } from '../../services/theme-store';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  protected readonly theme = inject(ThemeStore);
}
