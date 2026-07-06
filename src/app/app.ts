import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNav } from './shared/layout/app-nav/app-nav';
import { AppHeader } from './shared/layout/app-header/app-header';
import { inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ModeState } from './shared/services/mode-state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppNav, AppHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('LPSim');
   #router = inject(Router);
    #mode = inject(ModeState);

  constructor() {
    this.#router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        if (!e.url.startsWith('/exam')) {
          this.#mode.mode.set('lernen');
        }
      });
  }
}

