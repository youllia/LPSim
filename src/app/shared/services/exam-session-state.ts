import { Injectable, signal, computed } from '@angular/core';
import { AnswerInput } from './answer-check';

@Injectable({ providedIn: 'root' })
export class ExamSessionState {
  readonly answers = signal<Map<number, AnswerInput>>(new Map());

  saveAnswer(questionId: number, input: AnswerInput): void {
    this.answers.update(m => new Map(m).set(questionId, input));
  }

  getAnswer(questionId: number): AnswerInput | undefined {
    return this.answers().get(questionId);
  }

  hasAnswers(): boolean {
    return this.answers().size > 0;
  }

  reset(): void {
    this.answers.set(new Map());
  }
}
