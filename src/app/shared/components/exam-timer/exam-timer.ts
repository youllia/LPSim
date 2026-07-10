import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ExamSessionState } from '../../services/exam-session-state';

@Component({
  selector: 'app-exam-timer',
  imports: [],
  templateUrl: './exam-timer.html',
  styleUrl: './exam-timer.scss',
})
export class ExamTimer {
 #exam = inject(ExamSessionState);
  #router = inject(Router);

  protected formatted = computed(() => {
    const ms = this.#exam.remainingMs();
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  });

  protected isActive = computed(() =>
    this.#exam.startTime() !== null && !this.#exam.submitted()
  );

  // Under a minute left: switch to an urgent visual state.
  protected isLow = computed(() => {
    const ms = this.#exam.remainingMs();
    return ms > 0 && ms <= 60_000;
  });

  constructor() {
    // Tick: update now() / 1 Sec
    effect((onCleanup) => {
      if (!this.isActive()) return;
      const id = setInterval(() => this.#exam.tick(), 1000);
      onCleanup(() => clearInterval(id));
    });

    // Auto-submit
    effect(() => {
      if (this.isActive() && this.#exam.remainingMs() <= 0) {
        this.#exam.submit();
        this.#router.navigate(['/exam/result']);
      }
    });
  }
}

