import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { Question } from '../models/question';
import { API_URLS } from '../config/api.token';
import { firstValueFrom } from 'rxjs';

@Injectable({providedIn:'root'})
export class QuestionStore {
  #urls = inject(API_URLS);
  #http = inject(HttpClient);


  getByCatalog(catalogId: () => number) : HttpResourceRef<Question[]> {

    return httpResource<Question[]>(() => ({
      url: `${this.#urls.local}/questions`,
      params: { catalogId: catalogId() }
    }), { defaultValue: [] });
  }

  getSingle(id: () => number) : HttpResourceRef<Question | undefined> {
    return httpResource<Question>(() => ({
      url: `${this.#urls.local}/questions/${id()}`
    }));
  }

  async getMany(catalogIds: number[]): Promise<Question[]> {
  const requests = catalogIds.map(id =>
    firstValueFrom(this.#http.get<Question[]>(
      `${this.#urls.local}/questions`,
      { params: { catalogId: id } }
    ))
  );
  const results = await Promise.all(requests);
  return results.flat().map(q => ({ ...q, id: Number(q.id) }));
}
}
