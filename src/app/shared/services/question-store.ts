import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { API_URL } from '../api.config';
import { map } from 'rxjs';

@Service()
export class QuestionStore { 
  #http = inject(HttpClient);
  readonly questions = signal<Question[]>([]);

  loadByCatalog(catalogId: number) {
    this.#http
    .get<Question[]>(`${API_URL}/questions?catalogId=${catalogId}`)
    .pipe(
      map(data => data.map(q => ({ ...q, id: Number(q.id) })))
    )
    .subscribe(questions => this.questions.set(questions));
  }

  getSingle(questionId: number): Question | undefined {
    return this.questions().find(q => q.id === questionId);
  }
}
 