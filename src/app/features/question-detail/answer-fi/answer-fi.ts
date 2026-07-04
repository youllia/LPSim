import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../shared/models/question';
import { Mode } from '../../../shared/models/mode';
import { AnswerFeedback } from '../../../shared/components/answer-feedback/answer-feedback';
import { AnswerCheckService } from '../../../shared/services/answer-check';
import { AnswerActions } from '../../../shared/components/answer-actions/answer-actions';

@Component({
  selector: 'app-answer-fi',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, AnswerActions],
  templateUrl: './answer-fi.html',
  styleUrl: './answer-fi.scss'
})
export class AnswerFi {
  #check = inject(AnswerCheckService);

  readonly question = input.required<Question>();
  readonly mode = input.required<Mode>();

  protected userInput = linkedSignal<string>(() => {
    this.question();
    return '';
  });

  protected checked = linkedSignal<boolean>(() => {
    this.question();
    return false;
  });

  protected result = computed(() => this.#check.check(this.question(), {
    selectedId: null,
    selectedIds: [],
    userInput: this.userInput()
  }));

  protected isCorrect = computed(() => this.result().isCorrect);
  protected correctAnswers = computed(() => this.#check.correctAnswers(this.question()));
}
