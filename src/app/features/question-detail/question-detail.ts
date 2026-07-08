import { Component, computed, effect, inject, input, linkedSignal } from '@angular/core';
import { QuestionStore } from '../../shared/services/question-store';
import { QuestionNav } from './question-nav/question-nav';
import { AnswerCheckService } from '../../shared/services/answer-check';
import { AnswerActions } from '../../shared/components/answer-actions/answer-actions';
import { AnswerSc } from './answer-sc/answer-sc';
import { AnswerMc } from './answer-mc/answer-mc';
import { AnswerFi } from './answer-fi/answer-fi';
import { ModeState } from '../../shared/services/mode-state';
import { ExamSessionState } from '../../shared/services/exam-session-state';
import { ExamTimer } from '../../shared/components/exam-timer/exam-timer';
import { QuestionTypeLabelPipe } from '../../shared/pipes/question-type-label.pipe';
import { ActiveStateStore } from '../../shared/services/active-state-store';
import { Breadcrumbs } from '../../shared/components/breadcrumbs/breadcrumbs/breadcrumbs';
import { CatalogStore } from '../../shared/services/catalog-store';



@Component({
  selector: 'app-question-detail',
  imports: [
    QuestionNav, AnswerSc, AnswerMc, AnswerFi, AnswerActions, 
    ExamTimer, QuestionTypeLabelPipe, 
    Breadcrumbs
  ],
  templateUrl: './question-detail.html',
  styleUrl: './question-detail.scss',
})
export class QuestionDetail {
  #store = inject(QuestionStore);
  #check = inject(AnswerCheckService);
  #exam = inject(ExamSessionState);
  #catalogStore = inject(CatalogStore);
  #active = inject(ActiveStateStore);

  constructor() {
    effect(() => {
      this.#active.setActiveCatalog(this.catalogId());
      this.#active.setActiveQuestion(this.questionId());
    });
    
    // Save by stateUpdate (Prüfmodus)
    effect(() => {
      if (this.mode.mode() !== 'pruefung') return;
      this.#exam.saveAnswer(this.questionId(), {
        selectedId: this.selectedId(),
        selectedIds: this.selectedIds(),
        userInput: this.userInput()
      });
    });
  }

  protected mode = inject(ModeState);
  readonly catalogId = input.required({ transform: Number });
  readonly questionId = input.required({ transform: Number });
  protected questions = this.#store.getByCatalog(() => this.catalogId());
  protected questionsFromStore = this.#store.getByCatalog(() => this.catalogId() ?? 0);

  protected catalog = this.#catalogStore.getSingle(() => this.catalogId());

  protected question = computed(() => {
  if (this.mode.mode() === 'pruefung') {
    return this.#exam.orderedQuestions()
    .find(q => Number(q.id) === this.questionId());
    }
    return this.questionsFromStore.value()
    .find(q => Number(q.id) === this.questionId());
  });

  protected questionsForNav = computed(() =>
    this.mode.mode() === 'pruefung'
      ? this.#exam.orderedQuestions()
      : this.questionsFromStore.value()
  );

  protected questionIndex = computed(() => {
    const idx = this.questionsForNav().findIndex(q => Number(q.id) === this.questionId());
    return idx + 1;
  });

  protected questionsTotal = computed(() => this.questionsForNav().length);

  // Local state — conditional default (Prüfmodus read from Servise)
  protected selectedId = linkedSignal<number | null>(() => {
    this.questionId();
    return this.mode.mode() === 'pruefung'
      ? this.#exam.getAnswer(this.questionId())?.selectedId ?? null
      : null;
  });

  protected selectedIds = linkedSignal<number[]>(() => {
    this.questionId();
    return this.mode.mode() === 'pruefung'
      ? this.#exam.getAnswer(this.questionId())?.selectedIds ?? []
      : [];
  });

  protected userInput = linkedSignal<string>(() => {
    this.questionId();
    return this.mode.mode() === 'pruefung'
      ? this.#exam.getAnswer(this.questionId())?.userInput ?? ''
      : '';
  });

  protected checked = linkedSignal<boolean>(() => {
    this.questionId();
    return false;
  });

  protected isCorrect = computed(() => {
    const q = this.question();
    if (!q) return false;
    return this.#check.check(q, {
      selectedId: this.selectedId(),
      selectedIds: this.selectedIds(),
      userInput: this.userInput()
    }).isCorrect;
  });

  protected correctAnswers = computed(() =>
    this.question() ? this.#check.correctAnswers(this.question()!) : []
  );

  protected toggleMc(id: number, isChecked: boolean) {
    this.selectedIds.update(cur =>
      isChecked ? [...cur, id] : cur.filter(x => x !== id)
    );
  }
}
