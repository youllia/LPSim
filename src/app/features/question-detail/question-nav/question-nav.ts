import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../shared/models/question';

@Component({
  selector: 'app-question-nav',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './question-nav.html',
  styleUrl: './question-nav.scss'
})
export class QuestionNav {
  readonly questions = input.required<Question[]>();
  readonly catalogId = input.required<number>();
  readonly questionId = input.required<number>();

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

}
