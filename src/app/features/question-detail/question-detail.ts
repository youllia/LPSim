import { Component, computed, inject, input } from '@angular/core';
import { QuestionStore } from '../../shared/services/question-store';
import { QuestionNav } from './question-nav/question-nav';
import { ModeState } from '../../shared/services/mode-state';
import { AnswerSc } from './answer-sc/answer-sc';
import { AnswerMc } from './answer-mc/answer-mc';
import { AnswerFi } from './answer-fi/answer-fi';

@Component({
  selector: 'app-question-detail',
  imports: [QuestionNav, AnswerSc, AnswerMc, AnswerFi],
  templateUrl: './question-detail.html',
  styleUrl: './question-detail.scss',
})
export class QuestionDetail {
  #store = inject(QuestionStore);
  protected mode = inject(ModeState);

  readonly catalogId = input.required({ transform: Number });
  readonly questionId = input.required({ transform: Number });

  protected questions = this.#store.getByCatalog(() => this.catalogId());

  protected question = computed(() =>
    this.questions.value().find(q => Number(q.id) === this.questionId())
  );

  //protected questionsForNav = computed(() =>
  //   this.mode.mode() === 'pruefung'
  //     ? this.examState.orderedQuestions()
  //     : this.localQuestions.value()
  // );
}






