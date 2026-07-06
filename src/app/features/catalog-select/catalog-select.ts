import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogStore } from '../../shared/services/catalog-store';
import { CatalogCard } from '../../shared/components/catalog-card/catalog-card';

@Component({
  selector: 'app-catalog-select',
  imports: [CatalogCard, RouterLink],
  templateUrl: './catalog-select.html',
  styleUrl: './catalog-select.scss',
})

export class CatalogSelect {
  #catalogStore = inject(CatalogStore);

  readonly topicId = input.required({ transform: Number }); // Receive the topicId as an input property
  protected catalogs = this.#catalogStore.getByTopic(() => this.topicId());

}


