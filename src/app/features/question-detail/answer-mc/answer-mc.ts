import { Component, computed, input, linkedSignal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../shared/models/question';
import { Mode } from '../../../shared/models/mode';
import { AnswerFeedback } from '../../../shared/components/answer-feedback/answer-feedback';

@Component({
  selector: 'app-answer-mc',
  imports: [MatCheckboxModule, MatButtonModule, AnswerFeedback],
  templateUrl: './answer-mc.html'
})
export class AnswerMc {
  readonly question = input.required<Question>();
  readonly mode = input.required<Mode>();

  protected selectedIds = linkedSignal<number[]>(() => {
    this.question();
    return [];
  });

  protected checked = linkedSignal<boolean>(() => {
    this.question();
    return false;
  });

  protected isCorrect = computed(() => {
    const q = this.question();
    const correctIds = q.answers.filter(a => a.isCorrect).map(a => a.id).sort();
    const selected = [...this.selectedIds()].sort();
    return selected.length === correctIds.length
      && selected.every((id, i) => id === correctIds[i]);
  });

  protected correctAnswers = computed(() =>
    this.question().answers.filter(a => a.isCorrect)
  );

  protected toggle(id: number, isChecked: boolean) {
    this.selectedIds.update(current =>
      isChecked ? [...current, id] : current.filter(x => x !== id)
    );
  }
}
