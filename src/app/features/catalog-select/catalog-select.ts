import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CatalogStore } from '../../shared/services/catalog-store';
import { TopicStore } from '../../shared/services/topic-store';

@Component({
  selector: 'app-catalog-select',
  imports: [RouterLink],
  templateUrl: './catalog-select.html',
  styleUrl: './catalog-select.scss',
})

export class CatalogSelect {
  #route = inject(ActivatedRoute);
  store = inject(CatalogStore);
  topicStore = inject(TopicStore);

  topicId = signal<number>(0);
  #topic = computed(() => this.topicStore.topics().find(t => t.id === this.topicId()));
  
  constructor() {
    this.topicId.set(Number(this.#route.snapshot.paramMap.get('topicId')));
    
    //Cold-load
    if (this.topicStore.topics().length === 0) {
      this.topicStore.load();
    }

    effect(() => {
      const topic = this.#topic();
      if (topic) {
        this.store.loadByTopic(topic);
      }
    });
  }
}
  /* ngOnInit() {
    const topicId = Number(this.#route.snapshot.paramMap.get('topicId'));
    this.store.loadByTopic({ topicId });
  } */

