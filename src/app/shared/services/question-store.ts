import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { map } from 'rxjs';
import { environment } from '../../../environments/environments';
import { API_URLS } from '../config/api.token';

@Service()
export class QuestionStore {
  #http = inject(HttpClient);
  #urls = inject(API_URLS);
  readonly questions = signal<Question[]>([]);

  loadByCatalog(catalogId: number, apiUrl?: string) {
    const base = apiUrl??this.#urls.local;
    this.#http
      .get<Question[]>(`${base}/questions?catalogId=${catalogId}`)
      .pipe(map(this.#normalize))
      .subscribe(data => this.questions.set(data));
  }

  #normalize = (arr: Question[]) => arr.map(q => ({ ...q, id: Number(q.id) }));
  
  getSingle(questionId: number): Question | undefined {
    return this.questions().find(q => q.id === questionId);
  }
}
