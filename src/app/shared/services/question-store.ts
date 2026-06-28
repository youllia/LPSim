import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { API_URL } from '../api.config';

@Service()
export class QuestionStore { 
  #http = inject(HttpClient);
  readonly questions = signal<Question[]>([]);

  loadByCatalog(catalogId: number) {
    this.#http.get<Question[]>(`${API_URL}/questions?catalogId=${catalogId}`)
    .subscribe(data => this.questions.set(data));
  }

  getSingle(questionId: Number): Question | undefined {
    return this.questions().find(q => q.id == questionId);
  }
}
 