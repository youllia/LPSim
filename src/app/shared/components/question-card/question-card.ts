import { Component, input } from '@angular/core';
import { Question } from '../../models/question';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-question-card',
  imports: [RouterLink],
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss',
})
export class QuestionCard {
  readonly question = input.required<Question>();
  readonly catalogId = input.required<number>();
}
