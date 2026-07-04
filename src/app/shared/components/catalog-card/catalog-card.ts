import { Component, input } from '@angular/core';
import { Catalog } from '../../models/catalog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog-card',
  imports: [RouterLink],
  templateUrl: './catalog-card.html',
  styleUrl: './catalog-card.scss',
})
export class CatalogCard {
  readonly catalog = input.required<Catalog>(); // Receive a catalog as an input property
}
