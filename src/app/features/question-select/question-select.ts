import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuestionStore } from '../../shared/services/question-store';
import { QuestionCard } from '../../shared/components/question-card/question-card';

@Component({
  selector: 'app-question-select',
  imports: [QuestionCard, RouterLink],
  templateUrl: './question-select.html',
  styleUrl: './question-select.scss',
})
export class QuestionSelect {
  #questionStore = inject(QuestionStore);

  readonly catalogId = input.required({ transform: Number });
  protected questions = this.#questionStore.getByCatalog(() => this.catalogId());
}
