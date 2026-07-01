import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionStore } from '../../shared/services/question-store';
import { TopicStore } from '../../shared/services/topic-store';
import { CatalogStore } from '../../shared/services/catalog-store';

@Component({
  selector: 'app-question-select',
  imports: [RouterLink],
  templateUrl: './question-select.html',
  styleUrl: './question-select.scss',
})
export class QuestionSelect {
  #route = inject(ActivatedRoute);
  store = inject(QuestionStore);
  topicStore = inject(TopicStore);
  catalogStore = inject(CatalogStore);

  #catalogId = signal(0);

   #apiUrl = computed(() => {
     const catalog = this.catalogStore.catalogs().find(c => c.id === this.#catalogId());
     if (!catalog) return undefined;

     const topic = this.topicStore.topics().find(t => t.id === catalog.topicId);
     return topic?.apiUrl;
   });
  
  constructor() {
    this.#catalogId.set(Number(this.#route.snapshot.paramMap.get('catalogId')));
    
    // Cold-load
    if (this.topicStore.topics().length === 0) {
      this.topicStore.load();
    }

    effect(() => {
      const url = this.#apiUrl();
      const catalogId = this.#catalogId()

      if (catalogId && this.catalogStore.catalogs().length > 0) {
        this.store.loadByCatalog(catalogId, url);
      }
      if (this.catalogStore.catalogs().length === 0) {
        this.store.loadByCatalog(catalogId, url);
      } 
    });
  }
}
  /* ngOnInit() {
    this.catalogId = Number(this.#route.snapshot.paramMap.get('catalogId'));
    this.store.loadByCatalog(this.catalogId);
  } */