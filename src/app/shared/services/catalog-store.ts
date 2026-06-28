import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Catalog } from '../models/catalog';
import { API_URL } from '../api.config';

@Service()
export class CatalogStore {
  #http = inject(HttpClient);
  readonly catalogs = signal<Catalog[]>([]);
          
  loadByTopic(topicId: number) {
    this.#http.get<Catalog[]>(`${API_URL}/catalogs?topicId=${topicId}`)
      .subscribe(data => this.catalogs.set(data));
  }
}
