import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../shared/models/question';
import { Mode } from '../../../shared/models/mode';
import { AnswerFeedback } from '../../../shared/components/answer-feedback/answer-feedback';
import { AnswerCheckService } from '../../../shared/services/answer-check';
import { AnswerActions } from '../../../shared/components/answer-actions/answer-actions';

@Component({
  selector: 'app-answer-sc',
  imports: [MatRadioButton, MatRadioGroup, MatButtonModule, AnswerActions],
  templateUrl: './answer-sc.html',
  styleUrl: './answer-sc.scss'
})
export class AnswerSc {
  #check = inject(AnswerCheckService);

  readonly question = input.required<Question>();
  readonly mode = input.required<Mode>();

  protected selectedId = linkedSignal<number | null>(() => {
    this.question();
    return null;
  });

  protected checked = linkedSignal<boolean>(() => {
    this.question();
    return false;
  });

  protected result = computed(() => this.#check.check(this.question(), {
    selectedId: this.selectedId(),
    selectedIds: [],
    userInput: ''
  }));

  protected isCorrect = computed(() => this.result().isCorrect);
  protected correctAnswers = computed(() => this.#check.correctAnswers(this.question()));
}
