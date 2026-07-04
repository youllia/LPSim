import { Component, computed, inject, input, linkedSignal, output } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../shared/models/question';
import { Mode } from '../../../shared/models/mode';
import { AnswerCheckService } from '../../../shared/services/answer-check';
import { AnswerActions } from '../../../shared/components/answer-actions/answer-actions';

@Component({
  selector: 'app-answer-sc',
  imports: [MatRadioButton, MatRadioGroup],
  templateUrl: './answer-sc.html',
  styleUrl: './answer-sc.scss'
})
export class AnswerSc {
  readonly question = input.required<Question>();
  readonly selectedId = input<number | null>(null);
  readonly checked = input(false);

  readonly select = output<number>();
}
