import { Component, effect, inject, input } from '@angular/core';
import { CatalogStore } from '../../shared/services/catalog-store';
import { CatalogCard } from '../../shared/components/catalog-card/catalog-card';
import { ActiveStateStore } from '../../shared/services/active-state-store';
import { Breadcrumbs } from '../../shared/components/breadcrumbs/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-catalog-select',
  imports: [CatalogCard, Breadcrumbs],
  templateUrl: './catalog-select.html',
  styleUrl: './catalog-select.scss',
})

export class CatalogSelect {
  #catalogStore = inject(CatalogStore);
  #active = inject(ActiveStateStore);

  constructor() {
    effect(() => { this.#active.setActiveTopic(this.topicId()); });
  }

  readonly topicId = input.required({ transform: Number }); // Receive the topicId as an input property
  protected catalogs = this.#catalogStore.getByTopic(() => this.topicId());

}


