import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ActiveStateStore {
  readonly topicId = signal<number | null>(null);
  readonly catalogId = signal<number | null>(null);
  readonly questionId = signal<number | null>(null);

  clearAll(): void {
    this.topicId.set(null);
    this.catalogId.set(null);
    this.questionId.set(null);
  }

  setActiveTopic(topicId: number | null): void {
    this.topicId.set(topicId);
    this.catalogId.set(null);
    this.questionId.set(null);
  }

  setActiveCatalog(catalogId: number | null): void {
    this.catalogId.set(catalogId);
    this.questionId.set(null);
  }

  setActiveQuestion(questionId: number | null): void {
    this.questionId.set(questionId);
  }
}