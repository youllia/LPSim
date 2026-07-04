import { Component, computed, input, linkedSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../shared/models/question';
import { Mode } from '../../../shared/models/mode';
import { AnswerFeedback } from '../../../shared/components/answer-feedback/answer-feedback';

@Component({
  selector: 'app-answer-fi',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, AnswerFeedback],
  templateUrl: './answer-fi.html'
})
export class AnswerFi {
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

  protected isCorrect = computed(() => {
    const q = this.question();
    const user = this.userInput().trim().toLowerCase();
    if (!user) return false;
    return q.answers.some(a =>
      a.isCorrect && a.answerText.trim().toLowerCase() === user
    );
  });

  protected correctAnswers = computed(() =>
    this.question().answers.filter(a => a.isCorrect)
  );
}
