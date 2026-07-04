import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { QuestionStore } from '../../shared/services/question-store';
import { AnswerCheckService } from '../../shared/services/answer-check';
import { ModeState } from '../../shared/services/mode-state';
import { QuestionNav } from './question-nav/question-nav';
import { AnswerSc } from './answer-sc/answer-sc';
import { AnswerMc } from './answer-mc/answer-mc';
import { AnswerFi } from './answer-fi/answer-fi';
import { AnswerActions } from '../../shared/components/answer-actions/answer-actions';
import { QuestionTypeLabelPipe } from '../../shared/pipes/question-type-label.pipe';

@Component({
  selector: 'app-question-detail',
  imports: [QuestionNav, AnswerSc, AnswerMc, AnswerFi, AnswerActions, QuestionTypeLabelPipe, MatCardModule],
  templateUrl: './question-detail.html',
  styleUrl: './question-detail.scss',
})
export class QuestionDetail {
  #store = inject(QuestionStore);
  #check = inject(AnswerCheckService);
  protected mode = inject(ModeState);

  readonly catalogId = input.required({ transform: Number });
  readonly questionId = input.required({ transform: Number });

  protected questions = this.#store.getByCatalog(() => this.catalogId());

  protected question = computed(() =>
    this.questions.value().find(q => Number(q.id) === this.questionId())
  );

  protected questionIndex = computed(() => {
    const all = this.questions.value();
    const idx = all.findIndex(q => Number(q.id) === this.questionId());
    return idx + 1;
  });

  protected questionsTotal = computed(() => this.questions.value().length);

  // State reset
  protected selectedId = linkedSignal<number | null>(() => { this.questionId(); return null; });
  protected selectedIds = linkedSignal<number[]>(() => { this.questionId(); return []; });
  protected userInput = linkedSignal<string>(() => { this.questionId(); return ''; });
  protected checked = linkedSignal<boolean>(() => { this.questionId(); return false; });


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






