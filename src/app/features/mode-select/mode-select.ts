import { Component, inject, signal } from '@angular/core';
import { ModeState } from '../../shared/services/mode-state';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mode-select',
  imports: [RouterLink],
  templateUrl: './mode-select.html',
  styleUrl: './mode-select.scss',
})
export class ModeSelect {
  protected state = inject(ModeState);
}
