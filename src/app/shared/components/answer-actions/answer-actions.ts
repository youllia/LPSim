import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Answer } from '../../models/answer';
import { Mode } from '../../models/mode';
import { AnswerFeedback } from '../answer-feedback/answer-feedback';

@Component({
  selector: 'app-answer-actions',
  imports: [MatButtonModule, AnswerFeedback],
  templateUrl: './answer-actions.html'
})
export class AnswerActions {
  readonly mode = input.required<Mode>();
  readonly checked = input.required<boolean>();
  readonly isCorrect = input.required<boolean>();
  readonly correctAnswers = input.required<Answer[]>();

  readonly pruefen = output<void>();
}
