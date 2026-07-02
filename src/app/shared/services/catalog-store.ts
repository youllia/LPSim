import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Catalog } from '../models/catalog';
import { API_URLS } from '../config/api.token';
import { Topic } from '../models/topic';
import { map } from 'rxjs';

@Service()
export class CatalogStore {
  #http = inject(HttpClient);
  #urls = inject(API_URLS);
  readonly catalogs = signal<Catalog[]>([]);


   loadByTopic(topic: Topic) {
    const base = topic.apiUrl ?? this.#urls.local;
    this.#http.get<Catalog[]>(`${base}/catalogs?topicId=${topic.id}`)
      .pipe(map(this.#normalize))
      .subscribe(data => this.catalogs.set(data));
  }

  #normalize = (arr: Catalog[]) => arr.map(c => ({ ...c, id: Number(c.id) }))




/*   loadByTopic(topicId: number) {
    this.#http.get<Catalog[]>(`${environment.defaultApiUrl}/catalogs?topicId=${topicId}`)
      .subscribe(data => this.catalogs.set(data));
  }
      */
} 
