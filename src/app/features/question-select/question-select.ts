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
  
  // Signal to hold the current catalog ID
  #catalogId = signal(0);

  // Computed property to determine the API URL based on the current catalog and topic
  #apiUrl = computed(() => {
    const catalog = this.catalogStore.catalogs().find(c => c.id === this.#catalogId());
    if (!catalog) return undefined;
    const topic = this.topicStore.topics().find(t => t.id === catalog.topicId);
    return topic?.apiUrl;
  });
  // Effect to update the QuestionStore's catalogId and apiUrl whenever they change^^
  constructor() {
    this.#catalogId.set(Number(this.#route.snapshot.paramMap.get('catalogId')));
    
    // Cold-load
    if (this.topicStore.topics().length === 0) {
      this.topicStore.load();
    }
    // Cold-load catalogs if the catalogId is not found in the current list
    const catId = this.#catalogId();
    /* if (catId && !this.catalogStore.catalogs().find(c => c.id === catId)) {
      this.catalogStore.loadOne(catId);
    } */
    // Set the catalogId and apiUrl in the QuestionStore when they change
    fetch
        effect(() => {
          this.store.catalogId.set(this.#catalogId());
          this.store.apiUrl.set(this.#apiUrl());
        });
      }
    }



  /* ngOnInit() {
    this.catalogId = Number(this.#route.snapshot.paramMap.get('catalogId'));
    this.store.loadByCatalog(this.catalogId);
  } */