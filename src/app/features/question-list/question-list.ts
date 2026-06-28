import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from '@angular/router';
import { QuestionStore } from '../../shared/services/question-store';

@Component({
  selector: 'app-question-list',
  imports: [RouterLink],
  templateUrl: './question-list.html',
  styleUrl: './question-list.scss',
})
export class QuestionSelect implements OnInit {
  #route = inject(ActivatedRoute);
  protected store = inject(QuestionStore);

  ngOnInit() {
    const catalogId = Number(this.#route.snapshot.paramMap.get('catalogId'));
      this.store.loadByCatalog(catalogId);
  }
}
