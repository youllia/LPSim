import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Topic } from '../models/topic';
import { API_URL } from '../api.config';

@Service()
export class TopicStore {
    #http = inject(HttpClient);
    readonly topics = signal<Topic[]>([]);

    load() {
        this.#http.get<Topic[]>(`${API_URL}/topics`)
            .subscribe(data => this.topics.set(data));
    }
}
