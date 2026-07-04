import { inject, Injectable, Service } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Question } from '../models/question';
import { API_URLS } from '../config/api.token';

@Service()
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
