import { inject, Injectable } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Question } from '../models/question';
import { API_URLS } from '../config/api.token';

@Injectable({providedIn:'root'})
export class QuestionStore {
  #urls = inject(API_URLS);

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
}
