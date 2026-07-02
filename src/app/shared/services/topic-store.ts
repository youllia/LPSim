import { Service, inject, signal } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Topic } from '../models/topic';
import { API_URLS } from '../config/api.token';

@Service()
export class TopicStore {
    #urls = inject(API_URLS);
    
    getAll(): HttpResourceRef<Topic[]> {
        return httpResource<Topic[]>(() => ({
            url: `${this.#urls.local}/topics`
        }), { defaultValue: [] });
    }

    getSingle(id: () => number): HttpResourceRef<Topic | undefined> { 
        return httpResource<Topic>(
            () => (`${this.#urls.local}/topics/${id()}`) 
        );
    }


    /* load() {
        this.#http.get<Topic[]>(`${this.#urls.local}/topics`)
            .subscribe(data => this.topics.set(data));
    } */
}
