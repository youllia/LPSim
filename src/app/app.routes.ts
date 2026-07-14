import { Routes } from '@angular/router';
import { TopicSelect } from './features/topic-select/topic-select';
import { CatalogSelect } from './features/catalog-select/catalog-select';
import { QuestionSelect } from './features/question-select/question-select';
import { QuestionDetail } from './features/question-detail/question-detail';
import { ModeSelect } from './features/mode-select/mode-select';
import { Anleitung } from './features/anleitung/anleitung';
import { NotFound } from './features/not-found/not-found';
import { ExamResult } from './features/exam-result/exam-result';
import { ExamConfig } from './features/exam-config/exam-config';

export const routes: Routes = [
  { path: '', component: TopicSelect, title: 'LPSim — Themenauswahl' },
  { path: 'anleitung', component: Anleitung, title: 'LPSim — Anleitung' },
  { path: 'topics',  redirectTo: '', pathMatch: 'full', title: 'LPSim — Themenauswahl' },
  { path: 'topics/:topicId/catalogs', component: CatalogSelect, title: 'LPSim — Katalogauswahl' },
  { path: 'catalogs/:catalogId/questions', component: QuestionSelect, title: 'LPSim — Fragenliste' },
  { path: 'catalogs/:catalogId/questions/:questionId', component: QuestionDetail, title: 'LPSim — Lernen' },
  { path: 'mode', component: ModeSelect },
  { path: 'exam/config', component: ExamConfig, title: 'LPSim — Prüfung Einstellungen' },
  { path: 'exam/question/:questionId', component: QuestionDetail, title: 'LPSim — Prüfung' },
  { path: 'exam/result', component: ExamResult, title: 'LPSim — Ergebnis' },
  { path: '**', component: NotFound, title: 'LPSim — Die Seite existirt nicht' }
  ];

