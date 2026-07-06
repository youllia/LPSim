import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TopicStore } from '../../shared/services/topic-store';
import { CatalogStore } from '../../shared/services/catalog-store';
import { ExamSessionState } from '../../shared/services/exam-session-state';
import { ModeState } from '../../shared/services/mode-state';
import { API_URLS } from '../../shared/config/api.token';
import { Catalog } from '../../shared/models/catalog';
import { Question } from '../../shared/models/question';
import { shuffle } from '../../shared/utils/shuffle';

@Component({
  selector: 'app-exam-config',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, RouterLink],
  templateUrl: './exam-config.html',
  styleUrl: './exam-config.scss',
})
export class ExamConfig {
  #http = inject(HttpClient);
  #urls = inject(API_URLS);
  #topicStore = inject(TopicStore);
  #catalogStore = inject(CatalogStore);
  #exam = inject(ExamSessionState);
  #mode = inject(ModeState);
  #router = inject(Router);

  protected topics = this.#topicStore.getAll();
  protected catalogs = this.#catalogStore.getAll();

  protected selectedCatalogIds = signal<Set<number>>(new Set());
  protected anzahl = signal<number | null>(null);
  protected durationMinutes = signal<number>(60);
  protected shuffleQuestions = signal<boolean>(true);

  protected catalogsByTopic = computed(() => {
    const grouped = new Map<number, Catalog[]>();
    for (const c of this.catalogs.value()) {
      const key = Number(c.topicId);
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(c);
    }
    return grouped;
  });

  protected catalogsFor(topicId: number | string): Catalog[] {
    return this.catalogsByTopic().get(Number(topicId)) ?? [];
  }

  protected canStart = computed(() =>
    this.selectedCatalogIds().size > 0 && this.durationMinutes() > 0
  );

  protected isSelected(catalogId: number): boolean {
    return this.selectedCatalogIds().has(catalogId);
  }

  toggleCatalog(catalogId: number, checked: boolean): void {
    this.selectedCatalogIds.update(set => {
      const next = new Set(set);
      if (checked) next.add(catalogId); else next.delete(catalogId);
      return next;
    });
  }

  async onStart(): Promise<void> {
    const ids = Array.from(this.selectedCatalogIds());
    const requests = ids.map(catId =>
      firstValueFrom(this.#http.get<Question[]>(
        `${this.#urls.local}/questions`,
        { params: { catalogId: catId } }
      ))
    );
    const results = await Promise.all(requests);
    let all = results.flat().map(q => ({ ...q, id: Number(q.id) }));

    if (this.shuffleQuestions()) all = shuffle(all);
    const requested = this.anzahl();
    if (requested !== null && requested < all.length) all = all.slice(0, requested);

    this.#mode.mode.set('pruefung');
    this.#exam.startExam(all, this.durationMinutes() * 60 * 1000);
    this.#router.navigate(['/exam/question', all[0].id]);
  }

  onCancel(): void {
    this.#router.navigate(['/']);
  }
}
