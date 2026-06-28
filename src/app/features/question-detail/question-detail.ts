import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
  #id = 0;
  protected question = computed(() => this.store.questions()
    .find(q => q.id === this.#id))

  ngOnInit() {
    this.#id = Number(this.#route.snapshot.paramMap.get('questionId'));
    const catId = Number(this.#route.snapshot.paramMap.get('catalogId'))

    if (this.store.questions().length === 0) 
      { this.store.loadByCatalog(catId); }
  }



  selectedId = signal<number | null>(null);
  checked = signal(false);
  
  isCorrect =  computed(() => this.question()?.answers
  .find(a => a.id === this.selectedId())?.isCorrect ?? false);
  
  correctAnswers =  computed(() => this.question()?.answers
  .filter(a => a.isCorrect));


  protected prevId = computed(() => { const qArr =  this.store.questions();
    const i = qArr.findIndex(q =>q.id === this.#id);
    return qArr[i - 1]?.id;
  });
 protected nextId = computed(() => { const qArr =  this.store.questions();
    const i = qArr.findIndex(q =>q.id === this.#id);
    return qArr[i + 1]?.id;
  });

}
