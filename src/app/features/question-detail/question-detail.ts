import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionStore } from '../../shared/services/question-store';
import { ModeState } from '../../shared/services/mode-state';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-question-detail',
  imports: [
    RouterLink, 
    MatCheckboxModule, 
    MatRadioButton, 
    MatRadioGroup, 
    MatButtonModule, 
    MatButtonToggleModule, 
    MatFormFieldModule
  ],
  templateUrl: './question-detail.html',
  styleUrl: './question-detail.scss',
})

export class QuestionDetail implements OnInit {
  #route = inject(ActivatedRoute);
  store = inject(QuestionStore);
  #id = signal(0);


  protected mode = inject(ModeState);
  //protected unlock = signal(false);

  protected question = computed(() => this.store.questions()
    .find(q => q.id === this.#id()));

  protected selectedIds = signal<number[]>([]);
  
  protected toggleSelected(id: number, checked: boolean) {
    const current = this.selectedIds();
    this.selectedIds.set(
      checked ? [...current, id] : current.filter(x => x !== id)
    );
  }

  protected userInput = signal('');


  ngOnInit() {
    this.#route.paramMap.subscribe({
      next: params => {
        this.#id.set(Number(params.get('questionId')));

        this.selectedId.set(null);
        this.checked.set(false);
        //this.unlock.set(false);
        this.selectedIds.set([]);
        this.userInput.set('');

        const catId = Number(params.get('catalogId'));
        if (this.store.questions().length === 0) {
          this.store.loadByCatalog(catId);
        }
      }
    });
  }


  // Antwortcheck
  selectedId = signal<number | null>(null);
  checked = signal(false);

  isCorrect = computed(() => {
    const q = this.question();
    if (!q) return false;

    const correctIds = q.answers.filter(a => a.isCorrect).map(a => a.id).sort();
  });

 /*  isCorrect = computed(() => this.question()?.answers
    .find(a => a.id === this.selectedId())?.isCorrect ?? false); */

  correctAnswers = computed(() => this.question()?.answers
    .filter(a => a.isCorrect));



  // Navigation zwischen Fragen
  protected prevId = computed(() => {
    const qArr = this.store.questions();
    const i = qArr.findIndex(q => q.id === this.#id());
    return (i > 0) ? qArr[i - 1]?.id : undefined
  });
  
  protected nextId = computed(() => {
    const qArr = this.store.questions();
    const i = qArr.findIndex(q => q.id === this.#id());
    return (i >= 0 && i < qArr.length - 1 ) ? qArr[i + 1]?.id : undefined;
  });


  // 





}
