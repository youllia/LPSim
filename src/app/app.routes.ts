import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { TopicSelect } from './features/topic-select/topic-select';
import { CatalogSelect } from './features/catalog-select/catalog-select';
import { QuestionSelect } from './features/question-list/question-list';
import { QuestionDetail } from './features/question-detail/question-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'topics', component: TopicSelect },
  { path: 'topics/:topicId/catalogs', component: CatalogSelect },
  { path: 'catalogs/:catalogId/questions', component: QuestionSelect },
  { path: 'questions/:questionId', component: QuestionDetail },
];

