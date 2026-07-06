import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Topic } from '../../models/topic';

@Component({
  selector: 'app-topic-card',
  imports: [RouterLink],
  templateUrl: './topic-card.html',
  styleUrl: './topic-card.scss',
})
export class TopicCard {
  readonly topic = input.required<Topic>(); // Receive a topic as an input property
}
