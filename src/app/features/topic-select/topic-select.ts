import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TopicStore } from '../../shared/services/topic-store';
import { TopicCard } from '../../shared/components/topic-card/topic-card';

@Component({
  selector: 'app-topic-select',
  imports: [TopicCard, RouterLink, RouterLinkActive],
  templateUrl: './topic-select.html',
  styleUrl: './topic-select.scss',
})
export class TopicSelect {
  #store = inject(TopicStore);
  protected topics = this.#store.getAll(); // Fetch all topics from the TopicStore
  //readonly topics = input.required<Topic>(); // Receive topics as an input property


}
