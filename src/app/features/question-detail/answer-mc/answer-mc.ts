import { Component, computed, inject, input, linkedSignal, output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../shared/models/question';

@Component({
  selector: 'app-answer-mc',
  imports: [MatCheckboxModule, MatButtonModule],
  templateUrl: './answer-mc.html',
  styleUrl: './answer-mc.scss'
})
export class AnswerMc {
  readonly question = input.required<Question>();
  readonly selectedIds = input<number[]>([]);
  readonly checked = input(false);
  readonly toggle = output <{id: number, isChecked: boolean}>();
}
