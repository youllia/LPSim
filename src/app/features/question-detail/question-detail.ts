import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionStore } from '../../shared/services/question-store';
import { ModeState } from '../../shared/services/mode-state';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-question-detail',
  imports: [
    RouterLink, 
    MatCheckboxModule, 
    MatRadioButton, 
    MatRadioGroup, 
    MatButtonModule, 
    MatButtonToggleModule, 
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './question-detail.html',
  styleUrl: './question-detail.scss',
})

export class QuestionDetail implements OnInit {
  #route = inject(ActivatedRoute);
  store = inject(QuestionStore);
  protected mode = inject(ModeState);
  
  #id = signal<number>(0);

  protected question = computed(() => this.store.questions()
  .find(q => q.id === this.#id()));
  
  protected selectedAnswerId = signal<number | null>(null);
  protected selectedAnswerIds = signal<number[]>([]);
  protected userInput = signal('');

  checked  = signal<boolean>(false);
  
  ngOnInit() {
    this.#route.paramMap.subscribe({
      next: params => {
        this.#id.set(Number(params.get('questionId')));
        
        this.selectedAnswerId.set(null);
        this.selectedAnswerIds.set([]);
        this.userInput.set('');
        this.checked.set(false);
        
        const catId = Number(params.get('catalogId'));
        if (this.store.questions().length === 0) {
          this.store.loadByCatalog(catId);
        }
      }
    });
  }
  


  // Antwortcheck
  isCorrect = computed(() => {
    const q = this.question();
    if (!q) return false;

    const correctIds = q.answers
    .filter(a => a.isCorrect)
    .map(a => a.id).sort();

    if (q.type === 'sc') {
      return correctIds.length === 1 
      && correctIds[0] === this.selectedAnswerId();
    }
  
    if (q.type === 'mc') {
      const selected = [...this.selectedAnswerIds()].sort();
      return selected.length === correctIds.length 
      && selected.every((id, i) => id === correctIds[i]);
    }

    if (q.type === 'fi') {
      const user = this.userInput().trim().toLocaleLowerCase();
      if (!user) return false;
      return q.answers.some(a => a.isCorrect && 
        a.answerText.trim().toLowerCase() === user);
    }
    return false;
  });

  correctAnswers = computed(() => this.question()?.answers
    .filter(a => a.isCorrect));
  
  
    

  protected toggleSelected(id: number, checked: boolean) {
    const current = this.selectedAnswerIds();
  
    this.selectedAnswerIds.set(
      checked ? [...current, id] : current.filter(x => x !== id)
    );
  }

      
  // Navigation zwischen Fragen
  protected prevId = computed(() => {
    const questions = this.store.questions();
    const i = questions.findIndex(q => q.id === this.#id());
    return (i > 0) ? questions[i - 1]?.id : undefined
  });
  
  protected nextId = computed(() => {
    const questions = this.store.questions();
    const i = questions.findIndex(q => q.id === this.#id());
    return (i >= 0 && i < questions.length - 1 ) ? questions[i + 1]?.id : undefined;
  });


  // 





}
