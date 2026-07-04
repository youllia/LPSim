import { Component, computed, input, linkedSignal } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../shared/models/question';
import { Mode } from '../../../shared/models/mode';
import { AnswerFeedback } from '../../../shared/components/answer-feedback/answer-feedback';

@Component({
  selector: 'app-answer-sc',
  imports: [MatRadioButton, MatRadioGroup, MatButtonModule, AnswerFeedback],
  templateUrl: './answer-sc.html',
  styleUrl: './answer-sc.scss'
})
export class AnswerSc {
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

  protected isCorrect = computed(() => {
    const q = this.question();
    const correctIds = q.answers.filter(a => a.isCorrect).map(a => a.id);
    return correctIds.length === 1 && correctIds[0] === this.selectedId();
  });

  protected correctAnswers = computed(() =>
    this.question().answers.filter(a => a.isCorrect)
  );
}
