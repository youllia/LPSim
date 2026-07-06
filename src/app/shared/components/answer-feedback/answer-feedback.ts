import { Component, input } from '@angular/core';
import { Answer } from '../../models/answer';

@Component({
  selector: 'app-answer-feedback',
  imports: [],
  templateUrl: './answer-feedback.html',
  styleUrl: './answer-feedback.scss'
})
export class AnswerFeedback {
  readonly checked = input.required<boolean>();
  readonly isCorrect = input.required<boolean>();
  readonly correctAnswers = input.required<Answer[]>();
}
