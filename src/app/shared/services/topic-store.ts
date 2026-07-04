import { Injectable, inject } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Topic } from '../models/topic';
import { API_URLS } from '../config/api.token';

@Injectable({providedIn:'root'})
export class TopicStore {
    #urls = inject(API_URLS);

    //Fetch all topics from the API
    getAll(): HttpResourceRef<Topic[]> {
    return httpResource<Topic[]>(() => ({
        url: `${this.#urls.local}/topics`
    }), { defaultValue: [] });
}

    //Fetch a single topic by its ID
    getSingle(id: () => number): HttpResourceRef<Topic | undefined> {
        return httpResource<Topic>(
            () => (`${this.#urls.local}/topics/${id()}`)
        );
    }
}





0
/* Variant with HttpClient and Observable for fetching topics
import { Injectable, Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic';

@Injectable({providedIn: 'root'})
export class TopicStore {
  #http = inject(HttpClient);
  #urls = 'http://localhost:3000';

  // Fetch all topics from the API
  getAll(): Observable<Topic[]> {
      return this.#http.get<Topic[]>(`${this.#urls}/topics`);
  }

  // Fetch a single topic by its ID
  getSingle(id: number): Observable<Topic | undefined> {
      return this.#http.get<Topic | undefined>(`${this.#urls}/topics/${id}`);
  }
}
*/

