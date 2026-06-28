import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionStore } from '../../shared/services/question-store';
import { CatalogSelect } from '../catalog-select/catalog-select';

@Component({
  selector: 'app-question-select',
  imports: [RouterLink],
  templateUrl: './question-select.html',
  styleUrl: './question-select.scss',
})
export class QuestionSelect implements OnInit {
  #route = inject(ActivatedRoute);
  protected store = inject(QuestionStore);
  protected catalogId = 0; 

  ngOnInit() {
    this.catalogId = Number(this.#route.snapshot.paramMap.get('catalogId'));
      this.store.loadByCatalog(this.catalogId);
  }
}
