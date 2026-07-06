import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ModeState } from '../../shared/services/mode-state';
import { Mode } from '../../shared/models/mode';

@Component({
  selector: 'app-mode-select',
  imports: [ MatButtonToggleModule ],
  templateUrl: './mode-select.html',
  styleUrl: './mode-select.scss',
})
export class ModeSelect {
  protected state = inject(ModeState);
  #router = inject(Router);

  onModeChange(newMode: Mode): void {
    if (newMode === 'pruefung') {
      // Start mode in ExamConfig
      this.#router.navigate(['/exam/config']);
    } else {
      // Lernen → auto-reset ExamSessionState
      this.state.mode.set('lernen');
      // 
      if (this.#router.url.startsWith('/exam')) {
      this.#router.navigate(['/']);
    }
    }
  }
}
