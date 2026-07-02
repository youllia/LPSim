import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { TopicSelect } from './features/topic-select/topic-select';
import { CatalogSelect } from './features/catalog-select/catalog-select';
import { QuestionSelect } from './features/question-select/question-select';
import { QuestionDetail } from './features/question-detail/question-detail';
import { ModeSelect } from './features/mode-select/mode-select';
import { Anleitung } from './features/anleitung/anleitung';
import { NotFound } from './features/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'anleitung', component: Anleitung },
  { path: 'topics',  redirectTo: '', pathMatch: 'full' },
  { path: 'topics/:topicId/catalogs', component: CatalogSelect },
  { path: 'catalogs/:catalogId/questions', component: QuestionSelect },
  { path: 'catalogs/:catalogId/questions/:questionId', component: QuestionDetail },
  { path: 'mode', component: ModeSelect },
  { path: '**', component: NotFound}
];

