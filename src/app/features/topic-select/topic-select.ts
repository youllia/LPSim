import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopicStore } from '../../shared/services/topic-store';

@Component({
  selector: 'app-topic-select',
  imports: [RouterLink],
  templateUrl: './topic-select.html',
  styleUrl: './topic-select.scss',
})
export class TopicSelect implements OnInit {
    store = inject(TopicStore);

    ngOnInit() {
      this.store.load();
    }
}
