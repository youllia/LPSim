import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { TopicSelect } from './features/topic-select/topic-select';
import { CatalogSelect } from './features/catalog-select/catalog-select';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'topics', component: TopicSelect },
  { path: 'topics/:topicId/catalogs', component: CatalogSelect },
];
