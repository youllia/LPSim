import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Catalog } from '../models/catalog';

@Service()
export class CatalogStore {
    private http = inject(HttpClient);
    readonly catalogs = signal<Catalog[]>([]);

    loadByTopic(topicId: number) {
    this.http.get<Catalog[]>(`{API_URL}/catalogs?topicId=${topicId}`)
      .subscribe(data => this.catalogs.set(data));
  }
}
