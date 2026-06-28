import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionStore } from '../../shared/services/question-store';
import { Question } from '../../shared/models/question';

@Component({
  selector: 'app-question-detail',
  imports: [RouterLink],
  templateUrl: './question-detail.html',
  styleUrl: './question-detail.scss',
})
export class QuestionDetail implements OnInit {
  #route = inject(ActivatedRoute);
  store = inject(QuestionStore);

  protected question = signal<Question | undefined>(undefined);

  ngOnInit() {
    const questionId = this.#route.snapshot.paramMap.get('questionId');
    const id = Number(questionId);
    

    if (!Number.isNaN(id)) {
      this.question.set(this.store.getSingle(id));
    }
  }
}
