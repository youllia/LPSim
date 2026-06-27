import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CatalogStore } from '../../shared/services/catalog-store';

@Component({
  selector: 'app-catalog-select',
  imports: [RouterLink],
  templateUrl: './catalog-select.html',
  styleUrl: './catalog-select.scss',
})

export class CatalogSelect implements OnInit {
  private route = inject(ActivatedRoute);
  store = inject(CatalogStore);

  ngOnInit() {
    const topicId = Number(this.route.snapshot.paramMap.get('topicId'));
    this.store.loadByTopic(topicId);
  }
}
