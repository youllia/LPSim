import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ExamSessionState } from '../../shared/services/exam-session-state';
import { AnswerCheckService } from '../../shared/services/answer-check';
import { ModeState } from '../../shared/services/mode-state';


@Component({
  selector: 'app-exam-result',
  imports: [MatButtonModule],
  templateUrl: './exam-result.html',
  styleUrl: './exam-result.scss',
})
export class ExamResult {
  #exam = inject(ExamSessionState);
  #check = inject(AnswerCheckService);
  #mode = inject(ModeState);
  #router = inject(Router);

  protected questions = this.#exam.orderedQuestions;
  protected total = this.#exam.totalCount;

  protected results = computed(() =>
    this.questions().map(q => {
      const input = this.#exam.getAnswer(Number(q.id)) ?? {
        selectedId: null, selectedIds: [], userInput: ''
      };
      const result = this.#check.check(q, input);
      return { question: q, input, result };
    })
  );

  protected correctCount = computed(() =>
    this.results().filter(r => r.result.isCorrect).length
  );

  protected wrongResults = computed(() =>
    this.results().filter(r => !r.result.isCorrect)
  );

  protected percentage = computed(() => {
    const total = this.total();
    return total > 0 ? Math.round((this.correctCount() / total) * 100) : 0;
  });

  protected tone = computed(() => {
    const p = this.percentage();
    if (p >= 80) return 'ok';
    if (p >= 50) return 'mid';
    return 'low';
  });

  onRestart(): void {
    this.#mode.mode.set('lernen');  // effect in ExamSessionState to reset state
    this.#router.navigate(['/']);
  }

  onNewExam(): void {
    this.#exam.reset();
    this.#router.navigate(['/exam/config']);
  }
}
