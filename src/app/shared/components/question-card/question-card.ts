import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Question, QuestionType } from '../../models/question';
import { QuestionTypeLabelPipe } from '../../pipes/question-type-label.pipe';

@Component({
  selector: 'app-question-card',
  imports: [RouterLink, QuestionTypeLabelPipe],
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss',
})
export class QuestionCard {
  readonly question = input.required<Question>();
  readonly catalogId = input.required<number>();

  protected readonly typeShort: Record<QuestionType, string> = {
    sc: 'SC',
    mc: 'MC',
    fi: 'FI',
  };
}
