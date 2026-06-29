import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { TopicSelect } from './features/topic-select/topic-select';
import { CatalogSelect } from './features/catalog-select/catalog-select';
import { QuestionSelect } from './features/question-select/question-select';
import { QuestionDetail } from './features/question-detail/question-detail';
import { ModeSelect } from './features/mode-select/mode-select';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'topics', component: TopicSelect },
  { path: 'topics/:topicId/catalogs', component: CatalogSelect },
  { path: 'catalogs/:catalogId/questions', component: QuestionSelect },
  { path: 'catalogs/:catalogId/questions/:questionId', component: QuestionDetail },
  { path: 'mode', component: ModeSelect}
];

