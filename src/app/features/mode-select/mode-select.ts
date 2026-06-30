import { Component, inject, signal } from '@angular/core';
import { ModeState } from '../../shared/services/mode-state';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-mode-select',
  imports: [RouterLink, MatButtonToggleModule, MatSlideToggle],
  templateUrl: './mode-select.html',
  styleUrl: './mode-select.scss',
})
export class ModeSelect {
  protected state = inject(ModeState);
}
