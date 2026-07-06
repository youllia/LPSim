import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { AnswerInput } from './answer-check';
import { ModeState } from './mode-state';
import { Question } from '../models/question';

@Injectable({ providedIn: 'root' })
export class ExamSessionState {
  #mode = inject(ModeState);

  readonly orderedQuestions = signal<Question[]>([]);
  // readonly catalogId = signal<number | null>(null);
  // readonly orderedIds = signal<number[]>([]);
  readonly answers = signal<Map<number, AnswerInput>>(new Map());

  readonly startTime = signal<number | null>(null);
  readonly durationMs = signal<number>(60 * 60 * 1000);   // 60 мин default
  readonly submitted = signal<boolean>(false);
  readonly now = signal<number>(Date.now());

  readonly orderedIds = computed(() => this.orderedQuestions().map(q => Number(q.id)));
  readonly totalCount = computed(() => this.orderedQuestions().length);
  readonly answeredCount = computed(() => this.answers().size);
  // readonly totalCount = computed(() => this.orderedIds().length);

  readonly remainingMs = computed(() => {
    const start = this.startTime();
    if (!start) return 0;
    return Math.max(0, this.durationMs() - (this.now() - start));
  });

  constructor() {
    // reset
    effect(() => {
      if (this.#mode.mode() !== 'pruefung') {
        this.reset();
      }
    });
  }

   startExam(questions: Question[], durationMs: number): void {
    this.orderedQuestions.set(questions);
    this.answers.set(new Map());
    this.startTime.set(Date.now());
    this.durationMs.set(durationMs);
    this.submitted.set(false);
    this.now.set(Date.now());
  }

  saveAnswer(questionId: number, input: AnswerInput): void {
    this.answers.update(m => new Map(m).set(questionId, input));
  }

  getAnswer(questionId: number): AnswerInput | undefined {
    return this.answers().get(questionId);
  }

  // hasAnswers(): boolean {
  //   return this.answers().size > 0;
  // }

  tick(): void {
    this.now.set(Date.now());
  }

  submit(): void {
    this.submitted.set(true);
  }

  reset(): void {
    this.orderedQuestions.set([]);
    this.answers.set(new Map());
    this.startTime.set(null);
    this.submitted.set(false);
  }


}
