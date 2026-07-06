import { Component, inject } from '@angular/core';
//import { RouterLink, RouterLinkActive } from '@angular/router';
import { TopicStore } from '../../shared/services/topic-store';
import { TopicCard } from '../../shared/components/topic-card/topic-card';


@Component({
  selector: 'app-topic-select',
  imports: [TopicCard],
  templateUrl: './topic-select.html',
  styleUrl: './topic-select.scss',
})
export class TopicSelect {
  #topicStore = inject(TopicStore);

  protected topics = this.#topicStore.getAll(); // Fetch all topics from the TopicStore

}








//  Variant with signal and subscription to fetch topics

// import { Component, inject, signal } from '@angular/core';
// import { Topic } from '../../shared/models/topic';

// protected topics = signal<Topic[]>([]); // Initialize the signal to hold an array of topics
// constructor() {
//   this.#store.getAll().subscribe(topics => {
//     this.topics.set(topics); // Update the signal with the fetched topics
//   });
// }
