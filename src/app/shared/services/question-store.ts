import { computed, inject, Service, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { API_URLS } from '../config/api.token';

@Injectable({ providedIn: 'root' })

// The QuestionStore service manages the state and retrieval of questions from an API based on a catalog ID. 
// It uses Angular's dependency injection to access API URLs and provides reactive signals for the current catalog ID and API URL. 
// The service defines a resource to fetch questions, computes a list of questions, and exposes loading and error states. 
// It also includes a method to retrieve a single question by its ID.

export class QuestionStore {
  #urls = inject(API_URLS);

  // Signals to hold the current catalogId and API URL
  readonly catalogId = signal<number | null>(null);
  readonly apiUrl = signal<string | undefined>(undefined);

  // Define a resource to fetch questions based on the catalogId
  readonly resource = httpResource<Question[]>(() => {
      const catId = this.catalogId();
      if (!catId) return undefined;   
      return {
        url: `${this.apiUrl() ?? this.#urls.local}/questions`,
        params: { catalogId: catId }
      };
    }, { defaultValue: [] });

    // Computed property to transform the resource data into a list of questions
    readonly questions = computed(() =>
      this.resource.value().map(q => ({ ...q, id: Number(q.id) }))
    );

    // Expose loading and error states for the resource
    readonly isLoading = this.resource.isLoading; // Signal indicating if the resource is currently loading
    readonly error = this.resource.error;

    // Method to get a single question by its ID
    getSingle(id: number): Question | undefined {
      return this.questions().find(q => q.id === id);
    }
}
