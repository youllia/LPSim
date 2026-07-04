import { HttpResourceRef, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Catalog } from '../models/catalog';
import { API_URLS } from '../config/api.token';

@Injectable({providedIn:'root'})
export class CatalogStore {
  #urls = inject(API_URLS);

  // Fetch all catalogs associated with a specific topic ID
  getByTopic(topicId: () => number): HttpResourceRef<Catalog[]> { // Factory function to get catalogs by topicId
    return httpResource<Catalog[]>(() => ({
      url: `${this.#urls.local}/catalogs`,
      params: { topicId: topicId()} // Pass the topicId as a query parameter
     }), { defaultValue: [] }
  );
  }

  // Fetch a single catalog by its ID
  getSingle(id: () => number): HttpResourceRef<Catalog | undefined> {
    return httpResource<Catalog>( //  dynamically generate the URL based on the catalog ID
      () => (`${this.#urls.local}/catalogs/${id()}`)  // Construct the URL for fetching a single catalog by its ID
    );
  }
}
