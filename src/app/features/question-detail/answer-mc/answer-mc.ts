import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../shared/models/question';
import { Mode } from '../../../shared/models/mode';
import { AnswerFeedback } from '../../../shared/components/answer-feedback/answer-feedback';
import { AnswerCheckService } from '../../../shared/services/answer-check';
import { AnswerActions } from '../../../shared/components/answer-actions/answer-actions';

@Component({
  selector: 'app-answer-mc',
  imports: [MatCheckboxModule, MatButtonModule, AnswerActions],
  templateUrl: './answer-mc.html'
})
export class AnswerMc {
  #check = inject(AnswerCheckService);

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

  protected result = computed(() => this.#check.check(this.question(), {
    selectedId: null,
    selectedIds: this.selectedIds(),
    userInput: ''
  }));

  protected isCorrect = computed(() => this.result().isCorrect);
  protected correctAnswers = computed(() => this.#check.correctAnswers(this.question()));

  protected toggle(id: number, isChecked: boolean) {
    this.selectedIds.update(current =>
      isChecked ? [...current, id] : current.filter(x => x !== id)
    );
  }
}
