import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../shared/models/question';
import { ModeState } from '../../../shared/services/mode-state';

@Component({
  selector: 'app-question-nav',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './question-nav.html',
  styleUrl: './question-nav.scss'
})
export class QuestionNav {
  protected mode = inject(ModeState);
  readonly questions = input.required<Question[]>();
  readonly catalogId = input<number | null>(null);
  readonly questionId = input.required<number>();

  protected isExam = computed(() => this.mode.mode() === 'pruefung');

  protected prevId = computed(() => {
    const list = this.questions();
    const i = list.findIndex(q => Number(q.id) === this.questionId());
    return i > 0 ? Number(list[i - 1]?.id) : undefined;
  });

  protected nextId = computed(() => {
    const list = this.questions();
    const i = list.findIndex(q => Number(q.id) === this.questionId());
    return (i >= 0 && i < list.length - 1) ? Number(list[i + 1]?.id) : undefined;
  });

  protected linkTo(qid: number): any[] {
    return this.isExam()
      ? ['/exam', 'question', qid]
      : ['/catalogs', this.catalogId(), 'questions', qid];
  }

}
