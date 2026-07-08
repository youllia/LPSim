import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActiveStateStore } from '../../../services/active-state-store';
import { CatalogStore } from '../../../services/catalog-store';
import { TopicStore } from '../../../services/topic-store';


interface Crumb {
  label: string;
  link?: any[];
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
})
export class Breadcrumbs {
  #state = inject(ActiveStateStore);
  #catalogStore = inject(CatalogStore);
  #topicStore = inject(TopicStore);

  // Load catalog dynamiccaly by catalogId from store
  protected catalog = this.#catalogStore.getSingle(
    () => this.#state.catalogId() ?? 0
  );

  // Load topic — by topicId, or by catalog.topicId
  protected topic = this.#topicStore.getSingle(
    () => this.#state.topicId() ?? this.catalog.value()?.topicId ?? 0
  );

  protected items = computed<Crumb[]>(() => {
    const list: Crumb[] = [{ label: 'Themenbereiche', link: ['/'] }];

    const topic = this.topic.value();
    if (topic) {
      list.push({
        label: topic.name,
        link: this.#state.catalogId() ? ['/topics', topic.id, 'catalogs'] : undefined
      });
    }

    const catalog = this.catalog.value();
    if (catalog) {
      list.push({
        label: catalog.name,
        link: this.#state.questionId() ? ['/catalogs', catalog.id, 'questions'] : undefined
      });
    }

    const qid = this.#state.questionId();
    if (qid !== null) {
      list.push({ label: `Frage ${qid}` });
    }

    return list;
  });
}