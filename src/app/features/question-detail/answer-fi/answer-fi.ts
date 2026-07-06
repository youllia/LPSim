import { Component, input, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../shared/models/question';

@Component({
  selector: 'app-answer-fi',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './answer-fi.html',
  styleUrl: './answer-fi.scss'
})
export class AnswerFi {
  readonly question = input.required<Question>();
  readonly userInput = input();
  readonly checked = input(false);
  readonly isCorrect = input(false);
  readonly textChange  = output<string>();
}
