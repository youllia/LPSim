import { Component, effect, inject, input } from '@angular/core';
import { QuestionStore } from '../../shared/services/question-store';
import { QuestionCard } from '../../shared/components/question-card/question-card';
import { ActiveStateStore } from '../../shared/services/active-state-store';
import { Breadcrumbs } from '../../shared/components/breadcrumbs/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-question-select',
  imports: [QuestionCard, Breadcrumbs],
  templateUrl: './question-select.html',
  styleUrl: './question-select.scss',
})
export class QuestionSelect {
  #questionStore = inject(QuestionStore);
  #active = inject(ActiveStateStore);
  
  constructor() {
    effect(() => { this.#active.setActiveCatalog(this.catalogId()); });
  }


  readonly catalogId = input.required({ transform: Number });
  protected questions = this.#questionStore.getByCatalog(() => this.catalogId());
}
