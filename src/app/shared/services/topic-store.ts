import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Topic } from '../models/topic';
import { environment } from '../../../environments/environments';
import { API_URLS } from '../config/api.token';

@Service()
export class TopicStore {
    #http = inject(HttpClient);
    #urls = inject(API_URLS);
    readonly topics = signal<Topic[]>([]);

    load() {
        this.#http.get<Topic[]>(`${this.#urls.local}/topics`)
            .subscribe(data => this.topics.set(data));
    }
}
