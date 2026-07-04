import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Answer } from '../models/answer';

export interface AnswerInput {
  selectedId: number | null;   // SC
  selectedIds: number[];        // MC
  userInput: string;            // FI
}

export interface CheckResult {
  isCorrect: boolean;
  matched: Answer[];    // correct
  missing: Answer[];    // correct skip
  extra: Answer[];      // incorrect
}

@Injectable({ providedIn: 'root' })
export class AnswerCheckService {
  check(q: Question, input: AnswerInput): CheckResult {
    switch (q.type) {
      case 'sc': return this.#checkSc(q, input.selectedId);
      case 'mc': return this.#checkMc(q, input.selectedIds);
      case 'fi': return this.#checkFi(q, input.userInput);
    }
  }

  correctAnswers(q: Question): Answer[] {
    return q.answers.filter(a => a.isCorrect);
  }

  #checkSc(q: Question, selectedId: number | null): CheckResult {
    const matched = q.answers.filter(a => a.isCorrect && a.id === selectedId);
    const missing = q.answers.filter(a => a.isCorrect && a.id !== selectedId);
    const extra = q.answers.filter(a => !a.isCorrect && a.id === selectedId);
    return {
      isCorrect: matched.length > 0 && extra.length === 0,
      matched, missing, extra
    };
  }

  #checkMc(q: Question, selectedIds: number[]): CheckResult {
    const selectedSet = new Set(selectedIds);
    const matched = q.answers.filter(a => a.isCorrect && selectedSet.has(a.id));
    const missing = q.answers.filter(a => a.isCorrect && !selectedSet.has(a.id));
    const extra = q.answers.filter(a => !a.isCorrect && selectedSet.has(a.id));
    return {
      isCorrect: missing.length === 0 && extra.length === 0,
      matched, missing, extra
    };
  }

  #checkFi(q: Question, userInput: string): CheckResult {
    const user = userInput.trim().toLowerCase();
    if (!user) {
      return { isCorrect: false, matched: [], missing: this.correctAnswers(q), extra: [] };
    }
    const matched = q.answers.filter(a =>
      a.isCorrect && a.answerText.trim().toLowerCase() === user
    );
    const missing = matched.length === 0 ? this.correctAnswers(q) : [];
    return { isCorrect: matched.length > 0, matched, missing, extra: [] };
  }
}
